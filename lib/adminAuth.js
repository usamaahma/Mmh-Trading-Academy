import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return null;

  await dbConnect();
  const user = await User.findById(session.user.id)
    .select("role enrolledCourses")
    .lean();

  return user ? { session, user } : null;
}

export async function requireAdmin() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 },
    );
  }

  if (currentUser.user.role !== "ADMIN") {
    return NextResponse.json(
      { success: false, error: "Admin access required" },
      { status: 403 },
    );
  }

  return null;
}

export async function requireAuthenticated() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 },
    );
  }

  return null;
}