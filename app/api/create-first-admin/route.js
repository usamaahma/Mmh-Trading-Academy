import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    // Check karein agar pehle se koi admin hai to error de do (Security)
    const adminExists = await User.findOne({ role: "ADMIN" });
    if (adminExists) {
      return NextResponse.json({ error: "Admin already exists!" });
    }

    // Password ko hash karein
    const hashedPassword = await bcrypt.hash("admin123", 12); // "admin123" aapka password hai

    // Pehla Admin User banayein
    const newAdmin = await User.create({
      username: "master_admin", // Aapka username
      password: hashedPassword,
      role: "ADMIN"
    });

    return NextResponse.json({ 
      success: true, 
      message: "First Admin Created!",
      username: "mmhfadii",
      password: "Fahad@/123"
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}