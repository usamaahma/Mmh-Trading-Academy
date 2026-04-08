import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Landing from "@/models/Landing";

// GET: Landing page ka data nikaalne ke liye
export async function GET() {
  await dbConnect();
  try {
    const data = await Landing.findOne().sort({ createdAt: -1 }); // Latest data uthayega
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// POST: Naya data add ya update karne ke liye
export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    
    // Agar pehle se data hai toh usay update karega, warna naya banayega
    const updatedData = await Landing.findOneAndUpdate(
      {}, 
      body, 
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}