import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Transport from "@/models/Transport";
import { getSession } from "@/lib/session";

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const query: Record<string, any> = {};
    if (role !== "Super Admin") {
      query.schoolId = schoolId;
    } else {
      const filterSchoolId = searchParams.get("schoolId");
      if (filterSchoolId) query.schoolId = filterSchoolId;
    }

    if (search) {
      query.$or = [
        { routeName: { $regex: search, $options: "i" } },
        { vehicleNumber: { $regex: search, $options: "i" } },
        { driverName: { $regex: search, $options: "i" } },
      ];
    }
    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const total = await Transport.countDocuments(query);
    const routes = await Transport.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Compute stats across school/tenant routes
    const statsQuery: Record<string, any> = {};
    if (role !== "Super Admin") statsQuery.schoolId = schoolId;

    const allRoutes = await Transport.find(statsQuery);
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
      { message: "Failed to fetch transport routes", error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();
    const body = await request.json();

    const targetSchoolId = role === "Super Admin" ? (body.schoolId || null) : schoolId;
    if (!targetSchoolId && role !== "Super Admin") {
      return NextResponse.json({ message: "School Tenant ID required" }, { status: 400 });
    }

    const route = await Transport.create({
      schoolId: targetSchoolId,
      routeName: body.routeName,
      vehicleNumber: body.vehicleNumber,
      driverName: body.driverName,
      driverPhone: body.driverPhone,
      routeCost: body.routeCost ?? 0,
      capacity: body.capacity ?? 40,
      status: body.status || "Active",
    });

    return NextResponse.json(route, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create transport route", error: (error as Error).message },
      { status: 500 },
    );
  }
}
