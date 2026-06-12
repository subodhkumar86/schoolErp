import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Fee from "@/models/Fee";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "";
    const feeType = searchParams.get("feeType") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (feeType) query.feeType = feeType;

    const skip = (page - 1) * limit;
    const total = await Fee.countDocuments(query);
    const fees = await Fee.find(query)
      .populate("studentId", "name rollNumber studentClass")
      .sort({ dueDate: -1 })
      .skip(skip)
      .limit(limit);

    // Aggregate stats
    const stats = await Fee.aggregate([
      {
        $group: {
          _id: "$status",
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    return NextResponse.json({ data: fees, total, stats, page, limit });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch fees", error },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const fee = await Fee.create(body);
    return NextResponse.json(fee, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create fee", error },
      { status: 500 },
    );
  }
}
