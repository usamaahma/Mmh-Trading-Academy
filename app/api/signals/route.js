import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Signal from "@/models/Signal";

// 1. READ ALL (With Smart Filtering)
export async function GET(req) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");
        const strategy = searchParams.get("strategy");

        let query = {};

        // Category filter (FOREX, STOCKS, CRYPTO)
        if (category) {
            query.category = category.toUpperCase();
        }

        // 🔥 CRITICAL FIX: Agar strategy "ALL" hai ya empty hai, to filter mat lagao
        // Taake us category ke saare signals nazar aayein.
        if (strategy && strategy.toUpperCase() !== "ALL") {
            query.strategy = strategy.toUpperCase();
        }

        const signals = await Signal.find(query).sort({ createdAt: -1 });
        return NextResponse.json(signals, { status: 200 });
    } catch (error) {
        console.error("API Fetch Error:", error);
        return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
    }
}

// 2. CREATE (Wahi rahega)
export async function POST(req) {
    await dbConnect();
    try {
        const body = await req.json();
        const newSignal = await Signal.create(body);
        return NextResponse.json(newSignal, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}