import dbConnect from "@/lib/dbConnect";
import Analysis from "@/models/Analysis";
import { NextResponse } from "next/server";

// 🚀 3. PUT: Analysis ko Update karna
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const body = await req.json();

    const updated = await Analysis.findByIdAndUpdate(id, body, { new: true });
    
    if (!updated) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 🚀 4. DELETE: Analysis khatam karna
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const deleted = await Analysis.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Analysis Deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}