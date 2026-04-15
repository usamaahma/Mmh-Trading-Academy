import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Course from "@/models/Course";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    await dbConnect();

    // 1. Session se user ka data nikalna
    const session = await getServerSession(authOptions);

    // Agar user login nahi hai
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    let filter = {};

    // 2. Role check karna
    // Agar user ADMIN nahi hai (yani Student hai), toh filter lagao
    if (session.user.role !== "ADMIN") {
      filter = {
        _id: { $in: session.user.enrolledCourses }
      };
    }

    // 3. Database se data nikalna (Admin ke liye saare, Student ke liye filtered)
    const courses = await Course.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: courses });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST Method (Wese hi rahega, lekin behtar hai yahan Admin check laga dein)
export async function POST(req) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    // Security: Sirf Admin course create kar sakay
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    if (!body.courseName) {
      return NextResponse.json({ success: false, message: "Course Name is required" }, { status: 400 });
    }

    const newCourse = new Course(body);
    await newCourse.save();

    return NextResponse.json({ success: true, data: newCourse }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}