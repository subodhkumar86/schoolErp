import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Transport from "@/models/Transport";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const query: Record<string, unknown> = {};

    if (search) {
      query.$or = [
        { routeName: { $regex: search, $options: "i" } },
        { vehicleNumber: { $regex: search, $options: "i" } },
        { driverName: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;
    const total = await Transport.countDocuments(query);
    const routes = await Transport.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Aggregate stats
    const allRoutes = await Transport.find({});
    let activeVehicles = 0;
    let totalCapacity = 0;
    let maintenanceVehicles = 0;

    allRoutes.forEach((r) => {
      totalCapacity += r.capacity || 0;
      if (r.status === "Active") {
        activeVehicles++;
      } else if (r.status === "Maintenance") {
        maintenanceVehicles++;
      }
    });

    const stats = {
      totalRoutes: allRoutes.length,
      activeVehicles,
      maintenanceVehicles,
      totalCapacity,
    };

    return NextResponse.json({ data: routes, total, stats, page, limit });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch transport routes", error },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const route = await Transport.create(body);

    return NextResponse.json(route, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create transport route", error },
      { status: 500 },
    );
  }
}
