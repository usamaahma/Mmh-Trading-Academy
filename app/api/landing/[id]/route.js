import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Landing from "@/models/Landing";

// UPDATE: Specific entry ko edit karne ke liye
export async function PUT(req, { params }) {
    await dbConnect();
    try {
        const { id } = params;
        const body = await req.json();

        const updatedLanding = await Landing.findByIdAndUpdate(id, body, {
            new: true, // Updated data return karega
            runValidators: true,
        });

        if (!updatedLanding) {
            return NextResponse.json({ success: false, message: "Data not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedLanding });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

// DELETE: Specific entry ko urane ke liye
export async function DELETE(req, { params }) {
    await dbConnect();
    try {
        const { id } = params;
        const deletedLanding = await Landing.findByIdAndDelete(id);

        if (!deletedLanding) {
            return NextResponse.json({ success: false, message: "Data not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Entry deleted successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}