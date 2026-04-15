import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(req) {
    try {
        const session = await getServerSession(authOptions);

        // 1. Check ke request karne wala Admin hai ya nahi
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Unauthorized: Admin access required" },
                { status: 401 }
            );
        }

        await dbConnect();

        // Body se data nikalna (courses array lazmi shamil karein)
        const { id, username, password, role, courses } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // 2. Data Update logic
        if (username) user.username = username.toLowerCase();
        if (role) user.role = role;

        // 👇 Yeh line user ke courses update karegi
        // Agar frontend se courses ki list aayi hai to update karein, warna purani rehne dein
        if (courses) {
            user.enrolledCourses = courses;
        }

        // 3. Password logic (agar naya password bheja hai toh hash karein)
        if (password && password.trim() !== "") {
            const hashedPassword = await bcrypt.hash(password, 12);
            user.password = hashedPassword;
        }

        // 4. Database mein save karna
        await user.save();

        return NextResponse.json({
            success: true,
            message: "User updated successfully",
            // Debugging ke liye updated data bhej rahe hain
            updatedCourses: user.enrolledCourses
        });

    } catch (error) {
        console.error("UPDATE ERROR:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}