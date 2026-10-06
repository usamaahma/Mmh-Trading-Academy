import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";

export async function POST(req) {
    try {
        // 1. Session check karna ke request karne wala Admin hai ya nahi
        const denied = await requireAdmin();
        if (denied) return denied;

        await dbConnect();

        // 2. Body se data nikalna (courses array bhi shamil hai)
        const { username, email, password, role, courses } = await req.json();

        // 3. Basic validation
        if (!username || !password) {
            return NextResponse.json(
                { error: "Username and Password are required" },
                { status: 400 }
            );
        }

        const normalizedRole = role || "STUDENT";
        const usernameIsEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);
        const normalizedEmail = (email || (usernameIsEmail ? username : "")).trim().toLowerCase();
        if (normalizedRole === "STUDENT" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            return NextResponse.json(
                { error: "A valid email address is required for student accounts" },
                { status: 400 }
            );
        }
        if (normalizedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            return NextResponse.json(
                { error: "Enter a valid email address" },
                { status: 400 }
            );
        }

        // 4. Duplicate user check
        const existingUser = await User.findOne({ username: username.toLowerCase() });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // 5. Password hashing
        const hashedPassword = await bcrypt.hash(password, 12);

        // 6. User create karna database mein
        const newUser = await User.create({
            username: username.toLowerCase(),
            email: normalizedEmail || undefined,
            password: hashedPassword,
            role: normalizedRole,
            // Agar front-end se courses array aayi hai to wo save hogi, warna empty array []
            enrolledCourses: courses || []
        });

        return NextResponse.json({
            success: true,
            message: "User Created Successfully!",
            user: {
                id: newUser._id,
                username: newUser.username,
                role: newUser.role,
                enrolledCourses: newUser.enrolledCourses
            }
        });

    } catch (error) {
        console.error("Create User Error:", error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}