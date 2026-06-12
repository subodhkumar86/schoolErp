import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Attendance from "@/models/Attendance";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    await connectDB();

    const { id } = await params;

    const attendance = await Attendance.findById(id).populate("entityId");

    if (!attendance) {
      return NextResponse.json(
        {
          message: "Attendance not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(attendance);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch attendance",
        error,
      },
      {
        status: 500,
      },
    );
  }
}

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await request.json();

    const attendance = await Attendance.findByIdAndUpdate(id, body, {
      new: true,
    });

    return NextResponse.json(attendance);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to update attendance",
        error,
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    await connectDB();

    const { id } = await params;

    await Attendance.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to delete attendance",
        error,
      },
      {
        status: 500,
      },
    );
  }
}
