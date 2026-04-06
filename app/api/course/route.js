import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Course from "@/models/Course";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.courseName) {
      return NextResponse.json(
        { success: false, message: "Course Name is required" },
        { status: 400 },
      );
    }

    // Modern way to create
    const newCourse = new Course(body);
    await newCourse.save();

    return NextResponse.json(
      { success: true, data: newCourse },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const courses = await Course.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: courses });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
