import mongoose from "mongoose";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getCurrentUser } from "@/lib/adminAuth";
import Notification from "@/models/Notification";

export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    await dbConnect();
    const recipient = currentUser.user._id;
    const [notifications, unreadCount] = await Promise.all([
      Notification.find({ recipient })
        .sort({ createdAt: -1 })
        .limit(30)
        .populate("signal", "heading pair category strategy"),
      Notification.countDocuments({ recipient, readAt: null }),
    ]);

    return NextResponse.json({ notifications, unreadCount });
  } catch (error) {
    console.error("Notification fetch error:", error);
    return NextResponse.json({ error: "Could not load notifications" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { notificationId } = await request.json();
    if (!mongoose.isValidObjectId(notificationId)) {
      return NextResponse.json({ error: "Invalid notification" }, { status: 400 });
    }

    await dbConnect();
    const result = await Notification.updateOne(
      { _id: notificationId, recipient: currentUser.user._id },
      { $set: { readAt: new Date() } }
    );

    if (!result.matchedCount) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Notification update error:", error);
    return NextResponse.json({ error: "Could not update notification" }, { status: 500 });
  }
}