import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Signal from "@/models/Signal";
import Notification from "@/models/Notification";
import User from "@/models/User";
import { emailSignalToUsers } from "@/lib/signalEmail";
import { requireAdmin, requireAuthenticated } from "@/lib/adminAuth";

// 1. READ ALL (With Smart Filtering)
export async function GET(req) {
    try {
    const denied = await requireAuthenticated();
    if (denied) return denied;

    await dbConnect();
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");
        const strategy = searchParams.get("strategy");

        let query = {};

        // Category filter (FOREX, STOCKS, CRYPTO)
        if (category) {
            query.category = category.toUpperCase();
        }

        // 🔥 CRITICAL FIX: Agar strategy "ALL" hai ya empty hai, to filter mat lagao
        // Taake us category ke saare signals nazar aayein.
        if (strategy && strategy.toUpperCase() !== "ALL") {
            query.strategy = strategy.toUpperCase();
        }

        const signals = await Signal.find(query).sort({ createdAt: -1 });
        return NextResponse.json(signals, { status: 200 });
    } catch (error) {
        console.error("API Fetch Error:", error);
        return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
    }
}

// 2. CREATE (Wahi rahega)
export async function POST(req) {
    try {
    const denied = await requireAdmin();
    if (denied) return denied;

    await dbConnect();
        const body = await req.json();
        const newSignal = await Signal.create(body);
        let emailResult = { configured: false, sent: 0, failed: 0, skipped: 0 };

        const recipients = await User.find({}).select("_id email username role").lean();
        if (recipients.length) {
            try {
                await Notification.insertMany(
                    recipients.filter(({ role }) => role === "STUDENT")
                        .map(({ _id }) => ({ recipient: _id, signal: newSignal._id }))
                );
            } catch (notificationError) {
                console.error("Signal notifications could not be created:", notificationError);
            }

            try {
                emailResult = await emailSignalToUsers(newSignal, recipients);
            } catch (emailError) {
                console.error("Signal email delivery failed:", emailError.message);
                emailResult.failed = recipients.length;
            }
        }

        return NextResponse.json({ signal: newSignal, email: emailResult }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}