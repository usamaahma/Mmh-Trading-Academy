import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Course from "@/models/Course";

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const course = await Course.findById(id);
        if (!course) return NextResponse.json({ success: false, message: "Not Found" }, { status: 404 });
        return NextResponse.json({ success: true, data: course });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Invalid ID" }, { status: 400 });
    }
}

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();
        const updatedCourse = await Course.findByIdAndUpdate(id, body, { new: true });
        return NextResponse.json({ success: true, data: updatedCourse });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        await Course.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: "Deleted Successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}