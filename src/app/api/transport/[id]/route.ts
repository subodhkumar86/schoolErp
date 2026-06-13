import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Transport from "@/models/Transport";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const route = await Transport.findById(id);
    if (!route) {
      return NextResponse.json({ message: "Transport route not found" }, { status: 404 });
    }
    return NextResponse.json(route);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch transport details", error },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const route = await Transport.findByIdAndUpdate(
      id,
      {
        routeName: body.routeName,
        vehicleNumber: body.vehicleNumber,
        driverName: body.driverName,
        driverPhone: body.driverPhone,
        routeCost: Number(body.routeCost ?? 0),
        capacity: Number(body.capacity ?? 40),
        status: body.status,
      },
      { new: true, runValidators: true },
    );

    if (!route) {
      return NextResponse.json({ message: "Transport route not found" }, { status: 404 });
    }

    return NextResponse.json(route);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update transport route details", error },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const route = await Transport.findByIdAndDelete(id);
    if (!route) {
      return NextResponse.json({ message: "Transport route not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Transport route deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete transport route", error },
      { status: 500 },
    );
  }
}
