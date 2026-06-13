import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Setting from "@/models/Setting";

export async function GET() {
  try {
    await connectDB();
    let settings = await Setting.findOne({});
    if (!settings) {
      // Create default settings if none exist
      settings = await Setting.create({});
    }
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch settings", error },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    let settings = await Setting.findOne({});

    if (!settings) {
      settings = await Setting.create(body);
    } else {
      settings = await Setting.findByIdAndUpdate(settings._id, body, {
        new: true,
        runValidators: true,
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update settings", error },
      { status: 500 }
    );
  }
}
