import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Inventory from "@/models/Inventory";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const status = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const query: Record<string, unknown> = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;
    const total = await Inventory.countDocuments(query);
    const items = await Inventory.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Compute stats across ALL assets
    const allAssets = await Inventory.find({});
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
      { message: "Failed to fetch inventory assets", error },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const item = await Inventory.create({
      ...body,
      purchasedDate: body.purchasedDate ? new Date(body.purchasedDate) : undefined,
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create inventory item", error },
      { status: 500 },
    );
  }
}
