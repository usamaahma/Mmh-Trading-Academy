import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Broker from "@/models/Broker";

// 1. GET (Single Broker): /api/brokers/[id]
export async function GET(req, { params }) {
    await dbConnect();
    try {
        const { id } = params;
        const broker = await Broker.findById(id);
        if (!broker) return NextResponse.json({ success: false, message: "Broker not found" }, { status: 404 });
        
        return NextResponse.json({ success: true, data: broker }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

// 2. PUT (Update): /api/brokers/[id]
export async function PUT(req, { params }) {
    await dbConnect();
    try {
        const { id } = params;
        const body = await req.json();
        
        const updatedBroker = await Broker.findByIdAndUpdate(id, body, { 
            new: true, 
            runValidators: true 
        });

        if (!updatedBroker) return NextResponse.json({ success: false, message: "Broker not found" }, { status: 404 });

        return NextResponse.json({ success: true, data: updatedBroker }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

// 3. DELETE: /api/brokers/[id]
export async function DELETE(req, { params }) {
    await dbConnect();
    try {
        const { id } = params;
        const deletedBroker = await Broker.findByIdAndDelete(id);

        if (!deletedBroker) return NextResponse.json({ success: false, message: "Broker not found" }, { status: 404 });

        return NextResponse.json({ success: true, message: "Broker deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}