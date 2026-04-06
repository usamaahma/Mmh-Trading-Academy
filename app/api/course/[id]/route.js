import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Course from "@/models/Course";

// GET single course
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
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

// PUT (Update) course - Yahan 405 ka masla hota hai
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    // Direct update logic
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
    console.error("PUT Error:", error);
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
