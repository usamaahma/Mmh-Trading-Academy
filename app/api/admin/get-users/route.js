import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET() {
    try {
        const denied = await requireAdmin();
        if (denied) return denied;

        await dbConnect();

        // 👇 .populate('enrolledCourses') add kiya hai taake IDs ki jagah course ka data milay
        const users = await User.find({})
            .select("-password")
            .populate("enrolledCourses") 
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, users });
    } catch (error) {
        console.error("GET USERS ERROR:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}