import dbConnect from "@/lib/dbConnect";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const deletedMessage = await Contact.findByIdAndDelete(id);

    if (!deletedMessage) {
      return NextResponse.json(
        { success: false, message: "Message nahi mila!" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "Message terminal se ura diya gaya hai!" 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Delete karne mein masla aya." },
      { status: 500 }
    );
  }
}