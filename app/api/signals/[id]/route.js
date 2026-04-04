import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Signal from "@/models/Signal";

// 3. READ SINGLE SIGNAL
export async function GET(req, { params }) {
    await dbConnect();
    try {
        // 🔥 Next.js 15 Fix: params ko await karna zaroori hai
        const { id } = await params;

        const signal = await Signal.findById(id);
        if (!signal) return NextResponse.json({ error: "Not Found" }, { status: 404 });

        return NextResponse.json(signal);
    } catch (error) {
        return NextResponse.json({ error: "Invalid ID or Fetch failed" }, { status: 400 });
    }
}

// 4. UPDATE (Edit Signal)
export async function PUT(req, { params }) {
    await dbConnect();
    try {
        // 🔥 Next.js 15 Fix
        const { id } = await params;
        const body = await req.json();

        const updatedSignal = await Signal.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!updatedSignal) return NextResponse.json({ error: "Not Found" }, { status: 404 });
        return NextResponse.json(updatedSignal);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

// 5. DELETE
export async function DELETE(req, { params }) {
    await dbConnect();
    try {
        // 🔥 Next.js 15 Fix
        const { id } = await params;

        const deletedSignal = await Signal.findByIdAndDelete(id);
        if (!deletedSignal) return NextResponse.json({ error: "Not Found" }, { status: 404 });

        return NextResponse.json({ message: "Signal deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Delete failed" }, { status: 400 });
    }
}