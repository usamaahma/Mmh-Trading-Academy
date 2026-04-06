import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    // 1. Check karein agar 'mmhfadii' pehle se hai
    const userExists = await User.findOne({ username: "mmhfadii" });
    if (userExists) {
      return NextResponse.json({ error: "User 'mmhfadii' already exists!" });
    }

    // 2. Naya Password hash karein
    const hashedPassword = await bcrypt.hash("Fahad@/123", 12); 

    // 3. Admin User banayein with new credentials
    await User.create({
      username: "mmhfadii", 
      password: hashedPassword,
      role: "ADMIN"
    });

    return NextResponse.json({ 
      success: true, 
      message: "Admin 'mmhfadii' created successfully!",
      login_details: {
        username: "mmhfadii",
        password: "Fahad@/123"
      }
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
