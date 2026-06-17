import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Inventory from "@/models/Inventory";
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
    const category = searchParams.get("category") || "";
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
      query.name = { $regex: search, $options: "i" };
    }
    if (category) query.category = category;
    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const total = await Inventory.countDocuments(query);
    const items = await Inventory.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Compute stats across active school/tenant assets
    const statsQuery: Record<string, any> = {};
    if (role !== "Super Admin") statsQuery.schoolId = schoolId;

    const allAssets = await Inventory.find(statsQuery);
    let totalQty = 0;
    let activeQty = 0;
    let maintenanceQty = 0;
    let retiredQty = 0;

    allAssets.forEach((item) => {
      const qty = item.quantity || 0;
      totalQty += qty;
      if (item.status === "Active") {
        activeQty += qty;
      } else if (item.status === "Maintenance") {
        maintenanceQty += qty;
      } else if (item.status === "Retired") {
        retiredQty += qty;
      }
    });

    const stats = {
      totalAssets: totalQty,
      activeAssets: activeQty,
      maintenanceAssets: maintenanceQty,
      retiredAssets: retiredQty,
    };

    return NextResponse.json({ data: items, total, stats, page, limit });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch inventory assets", error: (error as Error).message },
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

    const item = await Inventory.create({
      schoolId: targetSchoolId,
      name: body.name,
      category: body.category,
      status: body.status || "Active",
      quantity: body.quantity ?? 1,
      costValue: body.costValue ?? 0,
      purchasedDate: body.purchasedDate ? new Date(body.purchasedDate) : undefined,
      location: body.location || "",
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create inventory item", error: (error as Error).message },
      { status: 500 },
    );
  }
}
