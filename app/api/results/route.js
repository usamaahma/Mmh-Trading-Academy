import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // Aapka db connection helper
import Result from "../../../models/Result";
import { requireAdmin } from "@/lib/adminAuth";

// GET: Saare results fetch karne ke liye
export async function GET() {
    try {
        await dbConnect();
        const results = await Result.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: results }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

// POST: Naya result add karne ke liye
export async function POST(req) {
    try {
        const denied = await requireAdmin();
        if (denied) return denied;

        await dbConnect();
        const body = await req.json();
        const result = await Result.create(body);
        return NextResponse.json({ success: true, data: result }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}