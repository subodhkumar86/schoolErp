import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT, signJWT } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const currentPayload = await verifyJWT(token);
    if (!currentPayload) {
      return NextResponse.json({ message: "Invalid session" }, { status: 401 });
    }

    if (currentPayload.role !== "Admin" && currentPayload.role !== "Super Admin") {
      return NextResponse.json({ message: "Forbidden: Admin access required" }, { status: 403 });
    }

    const body = await request.json();
    const { role } = body;
    if (!role) {
      return NextResponse.json({ message: "Role is required" }, { status: 400 });
    }

    if (role === "Super Admin" && currentPayload.role !== "Super Admin") {
      return NextResponse.json({ message: "Forbidden: Super Admin access required" }, { status: 403 });
    }

    await connectDB();

    let targetUser = null;
    if (role === "Super Admin") {
      targetUser = await User.findOne({ role: "Super Admin" });
    } else {
      // Find a user belonging to the current school with the target role
      targetUser = await User.findOne({
        schoolId: currentPayload.schoolId,
        role: role,
      });
    }

    if (!targetUser) {
      return NextResponse.json(
        { message: `No user with role "${role}" found for this school instance.` },
        { status: 404 }
      );
    }

    const newPayload = {
      userId: targetUser._id.toString(),
      username: targetUser.username,
      email: targetUser.email,
      role: targetUser.role,
      schoolId: targetUser.schoolId ? targetUser.schoolId.toString() : undefined,
    };

    const newToken = await signJWT(newPayload, false);

    const response = NextResponse.json({
      message: `Successfully swapped view to ${role}`,
      user: {
        id: targetUser._id,
        username: targetUser.username,
        email: targetUser.email,
        role: targetUser.role,
      },
    });

    response.cookies.set({
      name: "auth_token",
      value: newToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Impersonation failed", error: (error as Error).message },
      { status: 500 }
    );
  }
}
