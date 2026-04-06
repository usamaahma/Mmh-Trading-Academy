import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
// 👇 1. authOptions ko lazmi import karein (Path check kar lein apne setup ke mutabiq)
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
    try {
        // 👇 2. getServerSession ke andar authOptions pass karna zaroori hai
        const session = await getServerSession(authOptions);

        // Debugging ke liye (Terminal mein check karein agar error aaye)
        // console.log("Session in API:", session);

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Unauthorized: Admin access required" },
                { status: 401 }
            );
        }

        await dbConnect();
        const { username, password, role } = await req.json();

        // Basic validation
        if (!username || !password) {
            return NextResponse.json({ error: "Username and Password are required" }, { status: 400 });
        }

        const existingUser = await User.findOne({ username: username.toLowerCase() });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await User.create({
            username: username.toLowerCase(),
            password: hashedPassword,
            role: role || "STUDENT"
        });

        return NextResponse.json({ success: true, message: "User Created Successfully!" });

    } catch (error) {
        console.error("Create User Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}