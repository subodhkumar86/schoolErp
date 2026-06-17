import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Transport from "@/models/Transport";
import { getSession } from "@/lib/session";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();
    const { id } = await params;

    const query: Record<string, any> = { _id: id };
    if (role !== "Super Admin") {
      query.schoolId = schoolId;
    }

    const route = await Transport.findOne(query);
    if (!route) {
      return NextResponse.json({ message: "Transport route not found" }, { status: 404 });
    }
    return NextResponse.json(route);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch transport details", error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const query: Record<string, any> = { _id: id };
    if (role !== "Super Admin") {
      query.schoolId = schoolId;
    }

    const route = await Transport.findOneAndUpdate(
      query,
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
      return NextResponse.json({ message: "Transport route not found or access denied" }, { status: 404 });
    }

    return NextResponse.json(route);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update transport route details", error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();
    const { id } = await params;

    const query: Record<string, any> = { _id: id };
    if (role !== "Super Admin") {
      query.schoolId = schoolId;
    }

    const route = await Transport.findOneAndDelete(query);
    if (!route) {
      return NextResponse.json({ message: "Transport route not found or access denied" }, { status: 404 });
    }
    return NextResponse.json({ message: "Transport route deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete transport route", error: (error as Error).message },
      { status: 500 },
    );
  }
}
