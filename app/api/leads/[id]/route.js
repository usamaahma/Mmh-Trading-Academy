import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Lead from "@/models/Lead";
import { requireAdmin } from "@/lib/adminAuth";

// --- UPDATE: Mark as Read ya Status change ---
export async function PATCH(req, { params }) {
    try {
        const denied = await requireAdmin();
        if (denied) return denied;

        await dbConnect();

        // Next.js 14/15 mein params ko await karna lazmi hai
        const { id } = await params;
        const data = await req.json();

        if (typeof data.isRead !== "boolean") {
            return NextResponse.json({ error: "isRead must be a boolean" }, { status: 400 });
        }

        const updatedLead = await Lead.findByIdAndUpdate(id, { isRead: data.isRead }, {
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
        const denied = await requireAdmin();
        if (denied) return denied;

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