import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // Apna DB connection path check kar lena
import Lead from "@/models/Lead";

// --- CREATE: Naya Lead save karne ke liye ---
export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();

    // Basic check: Sirf phone number required hai
    if (!data.phoneNumber) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    const newLead = await Lead.create(data);
    return NextResponse.json({ success: true, data: newLead }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// --- READ: Saaray leads dekhne ke liye (Admin Dashboard) ---
export async function GET() {
  try {
    await dbConnect();
    // Newest leads sab se upar ayengi
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: leads });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch leads" }, { status: 500 });
  }
}