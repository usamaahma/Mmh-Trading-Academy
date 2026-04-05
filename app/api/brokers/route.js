import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Broker from "@/models/Broker";

// 1. GET: Fetch ALL brokers (Frontend list ke liye)
export async function GET() {
    await dbConnect();
    try {
        const brokers = await Broker.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: brokers }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

// 2. POST: Create a new broker (Admin Panel se add karne ke liye)
export async function POST(req) {
    await dbConnect();
    try {
        const body = await req.json();
        const newBroker = await Broker.create(body);
        return NextResponse.json({ success: true, data: newBroker }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}