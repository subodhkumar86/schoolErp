import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Fee from "@/models/Fee";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const fee = await Fee.findById(id).populate("studentId", "name rollNumber studentClass");
    if (!fee) {
      return NextResponse.json({ message: "Fee record not found" }, { status: 404 });
    }
    return NextResponse.json(fee);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch fee record", error },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const fee = await Fee.findByIdAndUpdate(
      id,
      {
        studentId: body.studentId,
        feeType: body.feeType,
        amount: body.amount,
        dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
        paidDate: body.paidDate ? new Date(body.paidDate) : undefined,
        status: body.status,
        paymentMethod: body.paymentMethod,
        remarks: body.remarks,
        receiptNumber: body.receiptNumber,
      },
      { new: true, runValidators: true },
    );

    if (!fee) {
      return NextResponse.json({ message: "Fee record not found" }, { status: 404 });
    }

    return NextResponse.json(fee);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update fee record", error },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const fee = await Fee.findByIdAndDelete(id);
    if (!fee) {
      return NextResponse.json({ message: "Fee record not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Fee record deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete fee record", error },
      { status: 500 },
    );
  }
}
