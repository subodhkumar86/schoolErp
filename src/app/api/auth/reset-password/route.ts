import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT, hashPassword } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const payload = await verifyJWT(token);
    if (!payload || (payload.role !== "Admin" && payload.role !== "Super Admin")) {
      return NextResponse.json({ message: "Forbidden: Admin access required" }, { status: 403 });
    }

    const body = await request.json();
    const { userId, newPassword } = body;

    if (!userId || !newPassword) {
      return NextResponse.json(
        { message: "User ID and new password are required" },
        { status: 400 }
      );
    }

    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.password = await hashPassword(newPassword);
    await user.save();

    return NextResponse.json({ message: `Password reset successfully for ${user.username}` });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred resetting password", error: (error as Error).message },
      { status: 500 }
    );
  }
}
