import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // 👈 Path check karein

export async function DELETE(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        // URL se ID nikaalna: /api/admin/delete-user?id=123
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        // Khud ko delete karne se rokna (Optional but safe)
        if (id === session.user.id) {
            return NextResponse.json({ error: "You cannot delete yourself!" }, { status: 400 });
        }

        await User.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: "User deleted successfully" });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}