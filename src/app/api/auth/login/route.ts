import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { comparePassword, signJWT } from "@/lib/auth";
import { seedUsers } from "@/lib/seed";

export async function POST(request: Request) {
  try {
    await connectDB();
    await seedUsers();

    const body = await request.json();
    const { identifier, password, rememberMe } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { message: "Username/Email and Password are required" },
        { status: 400 }
      );
    }

    const lowercaseIdentifier = identifier.trim().toLowerCase();

    // Find by username or email
    const user = await User.findOne({
      $or: [{ email: lowercaseIdentifier }, { username: lowercaseIdentifier }],
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid username/email or password" },
        { status: 401 }
      );
    }

    if (user.status !== "Active") {
      return NextResponse.json(
        { message: "User account is suspended" },
        { status: 403 }
      );
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid username/email or password" },
        { status: 401 }
      );
    }

    const payload = {
      userId: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      schoolId: user.schoolId ? user.schoolId.toString() : null,
    };

    const token = await signJWT(payload, rememberMe);

    // Set cookie
    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

    const maxAge = rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 24; // 7 days vs 1 day

    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred during login", error: (error as Error).message },
      { status: 500 }
    );
  }
}
