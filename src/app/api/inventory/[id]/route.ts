import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Inventory from "@/models/Inventory";
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

    const item = await Inventory.findOne(query);
    if (!item) {
      return NextResponse.json({ message: "Inventory asset not found" }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch asset details", error: (error as Error).message },
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

    const item = await Inventory.findOneAndUpdate(
      query,
      {
        name: body.name,
        category: body.category,
        status: body.status,
        quantity: Number(body.quantity ?? 1),
        costValue: Number(body.costValue ?? 0),
        purchasedDate: body.purchasedDate ? new Date(body.purchasedDate) : undefined,
        location: body.location,
      },
      { new: true, runValidators: true },
    );

    if (!item) {
      return NextResponse.json({ message: "Inventory asset not found or access denied" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update asset details", error: (error as Error).message },
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

    const item = await Inventory.findOneAndDelete(query);
    if (!item) {
      return NextResponse.json({ message: "Inventory asset not found or access denied" }, { status: 404 });
    }
    return NextResponse.json({ message: "Inventory asset deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete asset record", error: (error as Error).message },
      { status: 500 },
    );
  }
}
