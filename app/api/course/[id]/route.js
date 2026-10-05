import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Course from "@/models/Course";
import { getCurrentUser, requireAdmin } from "@/lib/adminAuth";

// GET single course
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const currentUser = await getCurrentUser();

    // 1. Session Check
    if (!currentUser) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // 2. Access Check: Agar Student hai to check karo ke ID uske enrolledCourses mein hai ya nahi
    if (currentUser.user.role !== "ADMIN") {
      const hasAccess = currentUser.user.enrolledCourses?.some(
        (courseId) => courseId.toString() === id,
      );
      if (!hasAccess) {
        return NextResponse.json(
          { success: false, message: "Aapke paas is course ki access nahi hai. Kindly payment karein." },
          { status: 403 }
        );
      }
    }

    const course = await Course.findById(id);
    if (!course)
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 },
      );

    return NextResponse.json({ success: true, data: course });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 },
    );
  }
}

// PUT (Update) course
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    // Security: Sirf Admin update kar sakay
    const denied = await requireAdmin();
    if (denied) return denied;

    const { id } = await params;
    const body = await req.json();

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { ...body, updatedAt: Date.now() },
      { new: true, runValidators: true },
    );

    if (!updatedCourse) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: updatedCourse });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

// DELETE course
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    // Security: Sirf Admin delete kar sakay
    const denied = await requireAdmin();
    if (denied) return denied;

    const { id } = await params;
    await Course.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Course deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}