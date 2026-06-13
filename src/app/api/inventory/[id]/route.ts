import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Inventory from "@/models/Inventory";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const item = await Inventory.findById(id);
    if (!item) {
      return NextResponse.json({ message: "Inventory asset not found" }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch asset details", error },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const item = await Inventory.findByIdAndUpdate(
      id,
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
      return NextResponse.json({ message: "Inventory asset not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update asset details", error },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const item = await Inventory.findByIdAndDelete(id);
    if (!item) {
      return NextResponse.json({ message: "Inventory asset not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Inventory asset deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete asset record", error },
      { status: 500 },
    );
  }
}
