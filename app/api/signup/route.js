import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { sendSignupEmails } from "@/lib/signupEmail";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_PATTERN = /^[a-z0-9._-]{3,30}$/;
const MIN_PASSWORD_LENGTH = 8;

export async function POST(req) {
    try {
        const body = await req.json().catch(() => ({}));

        // Honeypot: real users never fill this hidden field, bots usually do.
        if (body.website) {
            return NextResponse.json({ success: true, message: "Account created" });
        }

        const username = String(body.username || "").trim().toLowerCase();
        const email = String(body.email || "").trim().toLowerCase();
        const password = String(body.password || "");

        if (!USERNAME_PATTERN.test(username)) {
            return NextResponse.json(
                { error: "Username must be 3-30 characters: letters, numbers, dot, dash or underscore" },
                { status: 400 }
            );
        }
        if (!EMAIL_PATTERN.test(email)) {
            return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
        }
        if (password.length < MIN_PASSWORD_LENGTH) {
            return NextResponse.json(
                { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` },
                { status: 400 }
            );
        }

        await dbConnect();

        const existing = await User.findOne({
            $or: [{ username }, { email }, { username: email }],
        }).select("username email").lean();

        if (existing) {
            const field = existing.username === username ? "Username" : "Email";
            return NextResponse.json({ error: `${field} is already registered` }, { status: 409 });
        }

        const newUser = await User.create({
            username,
            email,
            password: await bcrypt.hash(password, 12),
            // Self-signups are always students with signals access; courses are granted only by admin.
            role: "STUDENT",
            enrolledCourses: [],
            signalsAccess: true,
            signupSource: "SELF",
        });

        const emailStatus = await sendSignupEmails(newUser);

        return NextResponse.json({
            success: true,
            message: "Welcome to MMH Trading Academy! Your account is registered.",
            emailSent: emailStatus.welcome,
            user: { id: newUser._id, username: newUser.username, email: newUser.email },
        }, { status: 201 });
    } catch (error) {
        if (error?.code === 11000) {
            return NextResponse.json({ error: "Username is already registered" }, { status: 409 });
        }
        console.error("Signup Error:", error);
        return NextResponse.json({ error: "Could not create account. Please try again." }, { status: 500 });
    }
}
