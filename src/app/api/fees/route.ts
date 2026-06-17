import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Fee from "@/models/Fee";
import Student from "@/models/Student";
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
    const feeType = searchParams.get("feeType") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    const query: Record<string, any> = {};
    if (role !== "Super Admin") {
      query.schoolId = schoolId;
    } else {
      const filterSchoolId = searchParams.get("schoolId");
      if (filterSchoolId) query.schoolId = filterSchoolId;
    }

    if (status) query.status = status;
    if (feeType) query.feeType = feeType;

    if (search) {
      const studentQuery: Record<string, any> = {
        name: { $regex: search, $options: "i" },
      };
      if (role !== "Super Admin") studentQuery.schoolId = schoolId;

      const students = await Student.find(studentQuery).select("_id");
      const studentIds = students.map((s) => s._id);
      query.studentId = { $in: studentIds };
    }

    const skip = (page - 1) * limit;
    const total = await Fee.countDocuments(query);
    const fees = await Fee.find(query)
      .populate("studentId", "name rollNumber studentClass")
      .sort({ dueDate: -1 })
      .skip(skip)
      .limit(limit);

    // Aggregate stats
    const stats = await Fee.aggregate([
      { $match: query },
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
      { message: "Failed to fetch fees", error: (error as Error).message },
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

    // Verify student exists in this school
    const student = await Student.findOne({ _id: body.studentId, schoolId: targetSchoolId });
    if (!student) {
      return NextResponse.json({ message: "Selected Student does not exist in your school" }, { status: 400 });
    }

    const fee = await Fee.create({
      schoolId: targetSchoolId,
      studentId: body.studentId,
      feeType: body.feeType,
      amount: body.amount,
      dueDate: body.dueDate,
      paidDate: body.paidDate,
      status: body.status || "Pending",
      paymentMethod: body.paymentMethod,
      remarks: body.remarks || "",
      receiptNumber: body.receiptNumber,
    });

    return NextResponse.json(fee, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create fee", error: (error as Error).message },
      { status: 500 },
    );
  }
}
