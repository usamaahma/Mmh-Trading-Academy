import dbConnect from "@/lib/dbConnect";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";

/**
 * DELETE Handler for Contact Messages
 * Path: /api/contact/[id]
 */
export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    // IMPORTANT: Next.js 15 requires awaiting params to access the ID
    const { id } = await params;

    // Validate if ID exists before proceeding
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID parameter is missing" },
        { status: 400 },
      );
    }

    // Perform the deletion in MongoDB
    const deletedMessage = await Contact.findByIdAndDelete(id);

    // If no document was found with that ID
    if (!deletedMessage) {
      return NextResponse.json(
        { success: false, message: "Message not found in database" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message has been successfully purged from the system",
    });
  } catch (error) {
    // Log the error for server-side debugging
    console.error("DELETE_CONTACT_ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error: " + error.message },
      { status: 500 },
    );
  }
}
export async function PATCH(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params; // Await params for Next.js 15
    const body = await req.json();

    // Update the message status in the database
    const updatedMessage = await Contact.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true } // Returns the updated document
    );

    if (!updatedMessage) {
      return NextResponse.json(
        { success: false, message: "Message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedMessage });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}