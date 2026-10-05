import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Result from "../../../../models/Result";
import { requireAdmin } from "@/lib/adminAuth";

// GET (Single): Ek specific result dekhne ke liye
export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const result = await Result.findById(id);
        if (!result) return NextResponse.json({ success: false, message: "Not Found" }, { status: 404 });
        
        return NextResponse.json({ success: true, data: result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

// PUT: Data update karne ke liye
export async function PUT(req, { params }) {
    try {
        const denied = await requireAdmin();
        if (denied) return denied;

        await dbConnect();
        const { id } = await params;
        const body = await req.json();
        const result = await Result.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!result) return NextResponse.json({ success: false, message: "Not Found" }, { status: 404 });
        
        return NextResponse.json({ success: true, data: result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

// DELETE: Result delete karne ke liye
export async function DELETE(req, { params }) {
    try {
        const denied = await requireAdmin();
        if (denied) return denied;

        await dbConnect();
        const { id } = await params;
        const deletedResult = await Result.findByIdAndDelete(id);
        if (!deletedResult) return NextResponse.json({ success: false, message: "Not Found" }, { status: 404 });
        return NextResponse.json({ success: true, message: "Deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}