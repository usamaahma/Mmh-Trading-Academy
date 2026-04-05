import dbConnect from "@/lib/dbConnect";
import Analysis from "@/models/Analysis";
import { NextResponse } from "next/server";

// 🚀 1. GET: Saare Analysis ya Category wise fetch karna
export async function GET(req) {
  try {
    await dbConnect();
    
    // URL se category pakarna (agar koi filter lagana chahye)
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let query = {};
    if (category && category !== "ALL") {
      query.category = category.toUpperCase();
    }

    const data = await Analysis.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 🚀 2. POST: Naya Analysis create karna
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.heading || !body.description || !body.image) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    const newAnalysis = await Analysis.create(body);
    return NextResponse.json({ success: true, data: newAnalysis }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}