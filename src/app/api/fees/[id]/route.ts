import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Fee from "@/models/Fee";
import Student from "@/models/Student";
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

    const fee = await Fee.findOne(query).populate("studentId", "name rollNumber studentClass");
    if (!fee) {
      return NextResponse.json({ message: "Fee record not found" }, { status: 404 });
    }
    return NextResponse.json(fee);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch fee record", error: (error as Error).message },
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

    // Verify student exists in this school if updating studentId
    const targetSchoolId = role === "Super Admin" ? (body.schoolId || null) : schoolId;
    if (body.studentId) {
      const student = await Student.findOne({ _id: body.studentId, schoolId: targetSchoolId });
      if (!student) {
        return NextResponse.json({ message: "Selected Student does not exist in your school" }, { status: 400 });
      }
    }

    const fee = await Fee.findOneAndUpdate(
      query,
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
      return NextResponse.json({ message: "Fee record not found or access denied" }, { status: 404 });
    }

    return NextResponse.json(fee);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update fee record", error: (error as Error).message },
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

    const fee = await Fee.findOneAndDelete(query);
    if (!fee) {
      return NextResponse.json({ message: "Fee record not found or access denied" }, { status: 404 });
    }
    return NextResponse.json({ message: "Fee record deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete fee record", error: (error as Error).message },
      { status: 500 },
    );
  }
}
