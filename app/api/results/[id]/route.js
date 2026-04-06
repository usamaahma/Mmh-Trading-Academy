import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Result from "../../../../models/Result";

// GET (Single): Ek specific result dekhne ke liye
export async function GET(req, { params }) {
    try {
        await dbConnect();
        const result = await Result.findById(params.id);
        if (!result) return NextResponse.json({ success: false, message: "Not Found" }, { status: 404 });
        
        return NextResponse.json({ success: true, data: result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

// PUT: Data update karne ke liye
export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const body = await req.json();
        const result = await Result.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        });
        
        return NextResponse.json({ success: true, data: result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

// DELETE: Result delete karne ke liye
export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const deletedResult = await Result.deleteOne({ _id: params.id });
        return NextResponse.json({ success: true, message: "Deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}