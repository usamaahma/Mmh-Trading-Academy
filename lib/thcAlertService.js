import { timingSafeEqual } from "node:crypto";

import { createHash } from "node:crypto";

const FIELDS = ["eventId", "alertType", "symbol", "timeframe", "direction", "entry", "sl", "tp"];
const ALERT_TYPES = new Set(["NEW_THC", "FAILED_THC_REVERSED"]);
const TIMEFRAMES = new Set(["M30", "H1", "H4", "D1"]);
const DIRECTIONS = new Set(["LONG", "SHORT"]);
const CLAIM_LEASE_MS = 2 * 60 * 1000;

export function authorizeThcRequest(authorization, configuredToken) {
  if (!configuredToken) return { authorized: false, status: 503, error: "not_configured" };
  const match = /^Bearer ([^\s]+)$/i.exec(authorization || "");
  if (!match) return { authorized: false, status: 401, error: "unauthorized" };
  const expected = Buffer.from(configuredToken);
  const supplied = Buffer.from(match[1]);
  const authorized = expected.length === supplied.length && timingSafeEqual(expected, supplied);
  return authorized
    ? { authorized: true }
    : { authorized: false, status: 401, error: "unauthorized" };
}

export function validateThcAlert(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const keys = Object.keys(value).sort();
  const expectedKeys = [...FIELDS].sort();
  if (keys.length !== expectedKeys.length || keys.some((key, index) => key !== expectedKeys[index])) return null;
  if (typeof value.eventId !== "string" || !/^[A-Za-z0-9_-]{1,200}$/.test(value.eventId)) return null;
  if (!ALERT_TYPES.has(value.alertType)) return null;
  const symbol = typeof value.symbol === "string" ? value.symbol.trim() : "";
  if (!symbol || symbol.length > 40 || /[\r\n\0]/.test(symbol)) return null;
  if (!TIMEFRAMES.has(value.timeframe) || !DIRECTIONS.has(value.direction)) return null;
  for (const key of ["entry", "sl", "tp"]) {
    if (typeof value[key] !== "number" || !Number.isFinite(value[key]) || value[key] <= 0) return null;
  }
  return { ...value, symbol: value.symbol.trim() };
}

export function thcAlertFingerprint(alert) {
  const canonicalPayload = JSON.stringify([
    alert.alertType,
    alert.symbol,
    alert.timeframe,
    alert.direction,
    alert.entry,
    alert.sl,
    alert.tp,
  ]);
  return createHash("sha256").update(canonicalPayload).digest("hex");
}

function response(status, body) {
  return { status, body };
}

export async function handleThcAlertRequest(request, dependencies) {
  const auth = authorizeThcRequest(
    request.headers.get("authorization"),
    dependencies.token
  );
  if (!auth.authorized) return response(auth.status, { complete: false, status: auth.error });

  let rawPayload;
  try {
    rawPayload = await request.json();
  } catch {
    return response(400, { complete: false, status: "invalid_json" });
  }
  const alert = validateThcAlert(rawPayload);
  if (!alert) return response(400, { complete: false, status: "invalid_payload" });

  try {
    await dependencies.connect();
    const fingerprint = thcAlertFingerprint(alert);
    const eventMatches = await dependencies.events.register(alert.eventId, fingerprint);
    if (!eventMatches) {
      return response(409, { complete: false, status: "event_id_conflict" });
    }

    let recipients = await dependencies.deliveries.recipients(alert.eventId);
    if (!recipients.length) {
      recipients = [...new Set((await dependencies.getRecipients()).map((email) =>
        String(email).trim().toLowerCase()
      ).filter(Boolean))];
    }
    if (!recipients.length) {
      return response(409, {
        complete: false,
        status: "no_recipients",
        intended: 0,
        delivered: 0,
        failed: 0,
      });
    }

    await dependencies.deliveries.ensure(alert.eventId, recipients);
    recipients = await dependencies.deliveries.recipients(alert.eventId);
    if (!recipients.length) {
      return response(409, {
        complete: false,
        status: "no_recipients",
        intended: 0,
        delivered: 0,
        failed: 0,
      });
    }
    for (let offset = 0; offset < recipients.length; offset += 10) {
      await Promise.all(recipients.slice(offset, offset + 10).map(async (recipient) => {
        const now = new Date();
        const claimed = await dependencies.deliveries.claim(alert.eventId, recipient, {
          now,
          expiredBefore: new Date(now.getTime() - CLAIM_LEASE_MS),
        });
        if (!claimed) return;
        try {
          const accepted = await dependencies.sendMail(recipient, alert);
          if (!accepted) throw new Error("SMTP did not accept recipient");
          await dependencies.deliveries.markDelivered(alert.eventId, recipient, now);
        } catch (error) {
          await dependencies.deliveries.markFailed(
            alert.eventId,
            recipient,
            String(error?.message || "SMTP submission failed").slice(0, 300)
          );
        }
      }));
    }

    const statuses = await dependencies.deliveries.statuses(alert.eventId, recipients);
    const delivered = recipients.filter((email) => statuses[email] === "DELIVERED").length;
    const failed = recipients.filter((email) => statuses[email] === "FAILED").length;
    const complete = delivered === recipients.length;
    if (complete) {
      return response(200, {
        complete: true,
        status: "complete",
        eventId: alert.eventId,
        intended: recipients.length,
        delivered,
        failed: 0,
      });
    }
    const inProgress = recipients.some((email) =>
      statuses[email] === "SENDING" || statuses[email] === "PENDING"
    );
    return response(inProgress ? 202 : 503, {
      complete: false,
      status: inProgress ? "in_progress" : "partial_failure",
      eventId: alert.eventId,
      intended: recipients.length,
      delivered,
      failed,
    });
  } catch (error) {
    console.error("THC email delivery processing failed:", error?.message || "Unknown error");
    return response(500, { complete: false, status: "delivery_error" });
  }
}
