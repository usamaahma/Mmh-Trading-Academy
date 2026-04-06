import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
// 👇 Path lazmi check karein ke yehi hai aapka
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
    try {
        // 👇 Yahan authOptions pass karna zaroori hai
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Unauthorized: Admin access required" },
                { status: 401 }
            );
        }

        await dbConnect();

        // Passwords ko hide karke saare users mangwao
        const users = await User.find({}).select("-password").sort({ createdAt: -1 });

        return NextResponse.json({ success: true, users });
    } catch (error) {
        console.error("GET USERS ERROR:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}