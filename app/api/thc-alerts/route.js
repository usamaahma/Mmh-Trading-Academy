import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { createSmtpTransport, resolveSignalEmailRecipients, sendThcEmail } from "@/lib/signalEmail";
import { handleThcAlertRequest } from "@/lib/thcAlertService";
import ThcAlertEvent from "@/models/ThcAlertEvent";
import ThcEmailDelivery from "@/models/ThcEmailDelivery";
import User from "@/models/User";

export const runtime = "nodejs";

async function ensureDeliveries(eventId, recipients) {
  await Promise.all(recipients.map(async (recipient) => {
    try {
      await ThcEmailDelivery.updateOne(
        { eventId, recipient },
        { $setOnInsert: { eventId, recipient, status: "PENDING", attempts: 0 } },
        { upsert: true }
      );
    } catch (error) {
      if (error?.code !== 11000) throw error;
    }
  }));
}

const deliveryStore = {
  ensure: ensureDeliveries,
  async recipients(eventId) {
    return ThcEmailDelivery.distinct("recipient", { eventId });
  },
  async claim(eventId, recipient, { now, expiredBefore }) {
    const claimed = await ThcEmailDelivery.findOneAndUpdate(
      {
        eventId,
        recipient,
        $or: [
          { status: { $in: ["PENDING", "FAILED"] } },
          { status: "SENDING", claimedAt: { $lt: expiredBefore } },
        ],
      },
      {
        $set: { status: "SENDING", claimedAt: now, lastError: null },
        $inc: { attempts: 1 },
      },
      { new: true }
    );
    return Boolean(claimed);
  },
  async markDelivered(eventId, recipient, now) {
    await ThcEmailDelivery.updateOne(
      { eventId, recipient },
      { $set: { status: "DELIVERED", deliveredAt: now, claimedAt: null, lastError: null } }
    );
  },
  async markFailed(eventId, recipient, message) {
    await ThcEmailDelivery.updateOne(
      { eventId, recipient },
      { $set: { status: "FAILED", claimedAt: null, lastError: message } }
    );
  },
  async statuses(eventId, recipients) {
    const rows = await ThcEmailDelivery.find({ eventId, recipient: { $in: recipients } })
      .select("recipient status")
      .lean();
    return Object.fromEntries(rows.map(({ recipient, status }) => [recipient, status]));
  },
};

const eventStore = {
  async register(eventId, payloadHash) {
    try {
      await ThcAlertEvent.updateOne(
        { eventId },
        { $setOnInsert: { eventId, payloadHash } },
        { upsert: true }
      );
    } catch (error) {
      if (error?.code !== 11000) throw error;
    }
    const event = await ThcAlertEvent.findOne({ eventId }).select("payloadHash").lean();
    return event?.payloadHash === payloadHash;
  },
};

export async function POST(request) {
  let transporter;
  const result = await handleThcAlertRequest(request, {
    token: process.env.THC_BOT_API_TOKEN,
    connect: async () => {
      await dbConnect();
      await ThcAlertEvent.init();
      await ThcEmailDelivery.init();
      transporter = createSmtpTransport();
    },
    getRecipients: async () => {
      // When THC_TEST_RECIPIENTS is set (comma-separated), only those addresses receive alerts.
      const testRecipients = (process.env.THC_TEST_RECIPIENTS || "").split(",").filter((email) => email.trim());
      if (testRecipients.length) {
        return resolveSignalEmailRecipients(testRecipients.map((email) => ({ email })));
      }
      const users = await User.find({}).select("email username role").lean();
      return resolveSignalEmailRecipients(users);
    },
    events: eventStore,
    deliveries: deliveryStore,
    sendMail: async (recipient, alert) => sendThcEmail(transporter, recipient, alert),
  });
  return NextResponse.json(result.body, { status: result.status });
}
