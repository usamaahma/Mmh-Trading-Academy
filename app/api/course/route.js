import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Course from "@/models/Course";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    await dbConnect();

    // 1. Session check karein (lekin block nahi karna guest ko)
    const session = await getServerSession(authOptions);

    // Case A: GUEST (Login nahi hai) -> Navbar ke liye sirf Names aur IDs bhej do
    if (!session) {
      const publicCourses = await Course.find({}).select("courseName _id").sort({ createdAt: -1 });
      return NextResponse.json({ success: true, data: publicCourses, isGuest: true });
    }

    // Case B: ADMIN -> Saare courses ka full data bhej do
    if (session.user.role === "ADMIN") {
      const allCourses = await Course.find({}).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, data: allCourses });
    }

    // Case C: STUDENT -> Sirf wahi courses jo khariday hain
    const enrolledFilter = {
      _id: { $in: session.user.enrolledCourses || [] }
    };
    const studentCourses = await Course.find(enrolledFilter).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: studentCourses });

  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST Method (Admin security ke sath same rahega)
export async function POST(req) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

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