import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Lead from "@/models/Lead";

// --- UPDATE: Mark as Read ya Status change ---
export async function PATCH(req, { params }) {
    try {
        await dbConnect();

        // Next.js 14/15 mein params ko await karna lazmi hai
        const { id } = await params;
        const data = await req.json();

        // Debugging ke liye log (Check karo terminal mein ID aa rahi hai ya nahi)
        console.log("Updating Lead ID:", id);

        const updatedLead = await Lead.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true // Validation check on update
        });

        if (!updatedLead) {
            return NextResponse.json({ error: "Lead not found in DB" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedLead });
    } catch (error) {
        console.error("Update Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// --- DELETE: Lead khatam karne ke liye ---
export async function DELETE(req, { params }) {
    try {
        await dbConnect();

        const { id } = await params;

        const deletedLead = await Lead.findByIdAndDelete(id);

        if (!deletedLead) {
            return NextResponse.json({ error: "Lead not found in DB" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Lead deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        return NextResponse.json({ success: false, error: "Delete failed" }, { status: 500 });
    }
}