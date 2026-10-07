import assert from "node:assert/strict";
import test from "node:test";
import { handleThcAlertRequest } from "./lib/thcAlertService.js";
import { thcEmailContent } from "./lib/signalEmail.js";
import ThcEmailDelivery from "./models/ThcEmailDelivery.js";

const alert = {
  eventId: "event-123",
  alertType: "NEW_THC",
  symbol: "XAUUSD",
  timeframe: "H1",
  direction: "LONG",
  entry: 2350.25,
  sl: 2340.25,
  tp: 2370.25,
};

function request(payload = alert, token = "test-token") {
  const headers = { "content-type": "application/json" };
  if (token !== null) headers.authorization = `Bearer ${token}`;
  return new Request("http://academy.example/api/thc-alerts", {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
}

class MemoryDeliveries {
  constructor() {
    this.rows = new Map();
  }

  key(eventId, recipient) {
    return `${eventId}:${recipient}`;
  }

  async ensure(eventId, recipients) {
    for (const recipient of recipients) {
      const key = this.key(eventId, recipient);
      if (!this.rows.has(key)) this.rows.set(key, { status: "PENDING", claimedAt: null });
    }
  }

  async recipients(eventId) {
    const prefix = `${eventId}:`;
    return [...this.rows.keys()]
      .filter((key) => key.startsWith(prefix))
      .map((key) => key.slice(prefix.length));
  }

  async claim(eventId, recipient, { now, expiredBefore }) {
    const row = this.rows.get(this.key(eventId, recipient));
    if (!row) return false;
    if (row.status === "PENDING" || row.status === "FAILED" ||
        (row.status === "SENDING" && row.claimedAt < expiredBefore)) {
      row.status = "SENDING";
      row.claimedAt = now;
      return true;
    }
    return false;
  }

  async markDelivered(eventId, recipient) {
    this.rows.get(this.key(eventId, recipient)).status = "DELIVERED";
  }

  async markFailed(eventId, recipient, message) {
    const row = this.rows.get(this.key(eventId, recipient));
    row.status = "FAILED";
    row.lastError = message;
  }

  async statuses(eventId, recipients) {
    return Object.fromEntries(recipients.map((recipient) => [
      recipient,
      this.rows.get(this.key(eventId, recipient))?.status,
    ]));
  }
}

class MemoryEvents {
  constructor() {
    this.payloadHashes = new Map();
  }

  async register(eventId, payloadHash) {
    if (!this.payloadHashes.has(eventId)) this.payloadHashes.set(eventId, payloadHash);
    return this.payloadHashes.get(eventId) === payloadHash;
  }
}

function dependencies({ recipients = ["student@example.com"], sendMail = async () => true } = {}) {
  return {
    token: "test-token",
    connect: async () => {},
    getRecipients: async () => recipients,
    events: new MemoryEvents(),
    deliveries: new MemoryDeliveries(),
    sendMail,
  };
}

test("rejects missing or invalid bearer credentials before processing", async () => {
  let connects = 0;
  const deps = dependencies();
  deps.connect = async () => { connects += 1; };

  const missingConfig = await handleThcAlertRequest(request(alert), { ...deps, token: "" });
  const missingHeader = await handleThcAlertRequest(request(alert, null), deps);
  const wrongToken = await handleThcAlertRequest(request(alert, "wrong"), deps);

  assert.equal(missingConfig.status, 503);
  assert.equal(missingHeader.status, 401);
  assert.equal(wrongToken.status, 401);
  assert.equal(connects, 0);
});

test("rejects malformed or extra payload fields without sending", async () => {
  let sends = 0;
  const deps = dependencies({ sendMail: async () => { sends += 1; return true; } });
  const extraField = await handleThcAlertRequest(request({ ...alert, detail: "not allowed" }), deps);
  const invalidDirection = await handleThcAlertRequest(request({ ...alert, direction: "BULLISH" }), deps);

  assert.equal(extraField.status, 400);
  assert.equal(invalidDirection.status, 400);
  assert.equal(sends, 0);
});

test("formats email with the required subject and only six body fields", () => {
  const content = thcEmailContent(alert);
  assert.equal(content.subject, "🔥 NEW THC");
  assert.equal(content.text, [
    "Symbol: XAUUSD",
    "Timeframe: H1",
    "Direction: LONG",
    "Entry: 2350.25",
    "SL: 2340.25",
    "TP: 2370.25",
  ].join("\n"));
  assert.equal(thcEmailContent({ ...alert, alertType: "FAILED_THC_REVERSED" }).subject,
    "🔄 FAILED THC → REVERSED");
});

test("delivery ledger has a unique event and recipient index", () => {
  const index = ThcEmailDelivery.schema.indexes().find(([keys]) =>
    keys.eventId === 1 && keys.recipient === 1
  );
  assert.ok(index);
  assert.equal(index[1].unique, true);
});

test("event ledger has a unique event ID index", async () => {
  const { default: ThcAlertEvent } = await import("./models/ThcAlertEvent.js");
  const index = ThcAlertEvent.schema.indexes().find(([keys]) => keys.eventId === 1);
  assert.ok(index);
  assert.equal(index[1].unique, true);
});

test("duplicate requests reuse delivered recipient status", async () => {
  let sends = 0;
  const deps = dependencies({ sendMail: async () => { sends += 1; return true; } });
  const first = await handleThcAlertRequest(request(), deps);
  const duplicate = await handleThcAlertRequest(request(), deps);

  assert.equal(first.body.complete, true);
  assert.equal(duplicate.body.complete, true);
  assert.equal(sends, 1);
});

test("rejects a reused event ID when its payload changes", async () => {
  let sends = 0;
  const deps = dependencies({ sendMail: async () => { sends += 1; return true; } });
  const first = await handleThcAlertRequest(request(), deps);
  const conflict = await handleThcAlertRequest(request({ ...alert, entry: 2351 }), deps);

  assert.equal(first.body.complete, true);
  assert.equal(conflict.status, 409);
  assert.equal(conflict.body.status, "event_id_conflict");
  assert.equal(sends, 1);
});

test("concurrent duplicate requests claim each recipient only once", async () => {
  let sends = 0;
  let started;
  const sending = new Promise((resolve) => { started = resolve; });
  let release;
  const hold = new Promise((resolve) => { release = resolve; });
  const deps = dependencies({
    sendMail: async () => {
      sends += 1;
      started();
      await hold;
      return true;
    },
  });

  const firstRequest = handleThcAlertRequest(request(), deps);
  await sending;
  const concurrent = await handleThcAlertRequest(request(), deps);
  assert.equal(concurrent.body.complete, false);
  assert.equal(concurrent.body.status, "in_progress");
  release();
  const first = await firstRequest;

  assert.equal(first.body.complete, true);
  assert.equal(sends, 1);
});

test("reclaims an expired recipient claim after a process crash", async () => {
  let sends = 0;
  const deps = dependencies({ sendMail: async () => { sends += 1; return true; } });
  const recipient = "student@example.com";
  await deps.deliveries.ensure(alert.eventId, [recipient]);
  const row = deps.deliveries.rows.get(deps.deliveries.key(alert.eventId, recipient));
  row.status = "SENDING";
  row.claimedAt = new Date(Date.now() - 3 * 60 * 1000);

  const retry = await handleThcAlertRequest(request(), deps);
  assert.equal(retry.body.complete, true);
  assert.equal(sends, 1);
});

test("partial SMTP failure retries only the unfinished recipient", async () => {
  const sends = { "one@example.com": 0, "two@example.com": 0 };
  const deps = dependencies({
    recipients: Object.keys(sends),
    sendMail: async (recipient) => {
      sends[recipient] += 1;
      if (recipient === "two@example.com" && sends[recipient] === 1) {
        throw new Error("temporary SMTP failure");
      }
      return true;
    },
  });

  const first = await handleThcAlertRequest(request(), deps);
  assert.equal(first.status, 503);
  assert.equal(first.body.complete, false);
  assert.equal(first.body.delivered, 1);
  assert.equal(first.body.failed, 1);

  const retry = await handleThcAlertRequest(request(), deps);
  assert.equal(retry.status, 200);
  assert.equal(retry.body.complete, true);
  assert.deepEqual(sends, { "one@example.com": 1, "two@example.com": 2 });
});

test("reports zero recipients as incomplete", async () => {
  const result = await handleThcAlertRequest(request(), dependencies({ recipients: [] }));
  assert.equal(result.status, 409);
  assert.equal(result.body.complete, false);
  assert.equal(result.body.status, "no_recipients");
  assert.equal(result.body.intended, 0);
});

test("retries the original recipient set after users change", async () => {
  let attempts = 0;
  const deps = dependencies({
    recipients: ["student@example.com"],
    sendMail: async () => {
      attempts += 1;
      if (attempts === 1) throw new Error("temporary SMTP failure");
      return true;
    },
  });
  const first = await handleThcAlertRequest(request(), deps);
  deps.getRecipients = async () => [];
  const retry = await handleThcAlertRequest(request(), deps);

  assert.equal(first.body.complete, false);
  assert.equal(retry.body.complete, true);
  assert.equal(attempts, 2);
});
