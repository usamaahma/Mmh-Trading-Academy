import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    // 1. Check karein ke mmhfadii pehle se to nahi hai
    const userExists = await User.findOne({ username: "mmhfadii" });
    
    if (userExists) {
      // Agar user hai, to usay Admin role assign kar do (Just in case)
      userExists.role = "ADMIN";
      await userExists.save();
      return NextResponse.json({ message: "User 'mmhfadii' already exists and is now ADMIN." });
    }

    // 2. Password Hashing
    const hashedPassword = await bcrypt.hash("Fahad@/123", 12); 

    // 3. Admin Create karein
    await User.create({
      username: "mmhfadii", 
      password: hashedPassword,
      role: "ADMIN"
    });

    return NextResponse.json({ 
      success: true, 
      message: "Live Admin 'mmhfadii' created successfully!",
      domain: "mmhtradingacademy.com"
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
