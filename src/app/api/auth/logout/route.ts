import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.cookies.set({
      name: "auth_token",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0, // Immediately expire
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred during logout", error: (error as Error).message },
      { status: 500 }
    );
  }
}
