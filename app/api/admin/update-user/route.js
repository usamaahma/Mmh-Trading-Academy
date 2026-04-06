import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // 👈 Path check karein

export async function PUT(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const { id, username, password, role } = await req.json();

        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Data Update logic
        if (username) user.username = username.toLowerCase();
        if (role) user.role = role;

        // Agar naya password bheja hai toh hash karein
        if (password && password.trim() !== "") {
            const hashedPassword = await bcrypt.hash(password, 12);
            user.password = hashedPassword;
        }

        await user.save();
        return NextResponse.json({ success: true, message: "User updated successfully" });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}