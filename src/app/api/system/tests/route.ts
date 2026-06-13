import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Student from "@/models/Student";
import Attendance from "@/models/Attendance";
import Fee from "@/models/Fee";
import { studentSchema } from "@/features/students/schemas/studentSchema";
import { attendanceSchema } from "@/features/attendance/schemas/attendanceSchema";
import { feeSchema } from "@/features/fees/schemas/feeSchema";
import { hashPassword, comparePassword, signJWT, verifyJWT } from "@/lib/auth";
import { z } from "zod";

// Zod schema for testing login validations
const loginTestSchema = z.object({
  identifier: z.string().min(3, "Username or Email must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
});

interface TestResult {
  suite: string;
  name: string;
  status: "passed" | "failed";
  durationMs: number;
  message?: string;
}

export async function GET() {
  const startTime = Date.now();
  const results: TestResult[] = [];

  const runTest = async (
    suite: string,
    name: string,
    testFn: () => Promise<void> | void
  ) => {
    const start = Date.now();
    try {
      await testFn();
      results.push({
        suite,
        name,
        status: "passed",
        durationMs: Date.now() - start,
      });
    } catch (error: unknown) {
      const err = error as Error;
      results.push({
        suite,
        name,
        status: "failed",
        durationMs: Date.now() - start,
        message: err.message || String(err),
      });
    }
  };

  // ==========================================
  // 1. SMOKE TESTS
  // ==========================================
  await runTest("Smoke Tests", "Env Variables Check", () => {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is missing.");
    }
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET environment variable is missing.");
    }
  });

  await runTest("Smoke Tests", "Database Connection Check", async () => {
    const conn = await connectDB();
    if (!conn || !conn.connection || conn.connection.readyState !== 1) {
      throw new Error("Database connection is not ready or is invalid.");
    }
  });

  // ==========================================
  // 2. VALIDATION TESTS (ZOD SCHEMAS)
  // ==========================================
  await runTest("Validation Tests", "Login validation (valid & invalid input)", () => {
    // Valid input
    const validParse = loginTestSchema.safeParse({
      identifier: "testuser@gmail.com",
      password: "securepassword123",
      rememberMe: true,
    });
    if (!validParse.success) {
      throw new Error("Valid login payload failed validation: " + JSON.stringify(validParse.error.format()));
    }

    // Invalid input (short password)
    const invalidParse = loginTestSchema.safeParse({
      identifier: "ok",
      password: "123", // too short
      rememberMe: false,
    });
    if (invalidParse.success) {
      throw new Error("Invalid login payload (short password) bypassed validation.");
    }
  });

  await runTest("Validation Tests", "Student creation validation (valid & invalid input)", () => {
    // Valid student data
    const validParse = studentSchema.safeParse({
      name: "John Doe",
      email: "johndoe@school.com",
      rollNumber: "S-101-A",
      studentClass: "Class 10",
      section: "A",
      gender: "Male",
      phone: "+1234567890",
      address: "123 School Lane",
      parentName: "Richard Doe",
      parentPhone: "+1987654321",
    });
    if (!validParse.success) {
      throw new Error("Valid student payload failed validation: " + JSON.stringify(validParse.error.format()));
    }

    // Invalid student data (missing roll number & name)
    const invalidParse = studentSchema.safeParse({
      email: "invalid-email-address",
      studentClass: "",
    });
    if (invalidParse.success) {
      throw new Error("Invalid student payload bypassed validation.");
    }
  });

  await runTest("Validation Tests", "Attendance schema validation", () => {
    // Valid attendance
    const validParse = attendanceSchema.safeParse({
      studentId: "650c1f6d9d146c2b189999a0",
      date: "2026-06-13",
      status: "Present",
      remarks: "On time",
    });
    if (!validParse.success) {
      throw new Error("Valid attendance payload failed validation: " + JSON.stringify(validParse.error.format()));
    }

    // Invalid attendance (wrong status)
    const invalidParse = attendanceSchema.safeParse({
      studentId: "650c1f6d9d146c2b189999a0",
      date: "2026-06-13",
      status: "NotPresent", // Invalid status enum
    });
    if (invalidParse.success) {
      throw new Error("Invalid attendance status bypassed validation.");
    }
  });

  await runTest("Validation Tests", "Fee Collection validation", () => {
    // Valid fee collection
    const validParse = feeSchema.safeParse({
      studentId: "650c1f6d9d146c2b189999a0",
      feeType: "Tuition",
      amount: "1500", // coerced to number
      dueDate: "2026-06-30",
      status: "Pending",
    });
    if (!validParse.success) {
      throw new Error("Valid fee payload failed validation: " + JSON.stringify(validParse.error.format()));
    }

    // Invalid fee collection (negative/zero amount)
    const invalidParse = feeSchema.safeParse({
      studentId: "650c1f6d9d146c2b189999a0",
      feeType: "Tuition",
      amount: "0", // Invalid amount
      dueDate: "",
    });
    if (invalidParse.success) {
      throw new Error("Invalid fee amount (0) and empty dueDate bypassed validation.");
    }
  });

  // ==========================================
  // 3. INTEGRATION TESTS (CRITICAL FLOWS & DB)
  // ==========================================
  let testStudentId: string | null = null;
  let testAttendanceId: string | null = null;
  let testFeeId: string | null = null;

  await runTest("Critical Flow", "Authentication / Crypto Operations", async () => {
    const originalPassword = "MySecretPass999";
    const hashed = await hashPassword(originalPassword);
    
    // Test comparison
    const match = await comparePassword(originalPassword, hashed);
    if (!match) {
      throw new Error("Password hashing verification failed: password does not match hash.");
    }

    const wrongMatch = await comparePassword("WrongPass", hashed);
    if (wrongMatch) {
      throw new Error("Password hashing verification failed: incorrect password matched the hash.");
    }

    // JWT sign/verify
    const payload = {
      userId: "650c1f6d9d146c2b189999b1",
      username: "testadmin",
      email: "testadmin@school.com",
      role: "Admin",
    };
    const token = await signJWT(payload);
    const decoded = await verifyJWT(token);
    
    if (!decoded || decoded.userId !== payload.userId || decoded.role !== payload.role) {
      throw new Error("JWT token sign/verify failed or returned corrupted payload.");
    }
  });

  await runTest("Critical Flow", "Create & Query Student (DB)", async () => {
    // Ensure DB connection is loaded
    await connectDB();

    // Clean up any stale diagnostic test students
    await Student.deleteMany({ rollNumber: "DIAG-TEST-999" });

    const newStudent = await Student.create({
      name: "Diagnostics Student Test",
      email: "diagnostics@school.com",
      rollNumber: "DIAG-TEST-999",
      studentClass: "Class 10",
      section: "A",
      gender: "Other",
      address: "System Diagnostic Lab",
      status: "Active",
      admissionDate: new Date(),
    });

    if (!newStudent || !newStudent._id) {
      throw new Error("Failed to insert student record into MongoDB.");
    }
    
    testStudentId = String(newStudent._id);

    // Query back
    const found = await Student.findOne({ rollNumber: "DIAG-TEST-999" });
    if (!found || found.name !== "Diagnostics Student Test") {
      throw new Error("Failed to retrieve the inserted student record from database.");
    }
  });

  await runTest("Critical Flow", "Edit Student (DB)", async () => {
    if (!testStudentId) throw new Error("Skipped: Student ID not initialized.");

    const updated = await Student.findByIdAndUpdate(
      testStudentId,
      { name: "Diagnostics Student Test - Updated" },
      { new: true }
    );

    if (!updated || updated.name !== "Diagnostics Student Test - Updated") {
      throw new Error("Failed to update student name in database.");
    }
  });

  await runTest("Critical Flow", "Attendance Marking (DB)", async () => {
    if (!testStudentId) throw new Error("Skipped: Student ID not initialized.");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Clean up any stale attendance records
    await Attendance.deleteMany({ entityId: testStudentId });

    const attendanceRecord = await Attendance.create({
      entityId: testStudentId,
      entityType: "Student",
      date: today,
      status: "Present",
      remarks: "System check Present",
      markedBy: "Diagnostic Tool",
    });

    if (!attendanceRecord || !attendanceRecord._id) {
      throw new Error("Failed to insert attendance record into MongoDB.");
    }

    testAttendanceId = String(attendanceRecord._id);

    // Query it back
    const found = await Attendance.findOne({ entityId: testStudentId, date: today });
    if (!found || found.status !== "Present") {
      throw new Error("Failed to verify attendance marking record in database.");
    }
  });

  await runTest("Critical Flow", "Fee Collection / Invoice (DB)", async () => {
    if (!testStudentId) throw new Error("Skipped: Student ID not initialized.");

    // Clean up any stale fee records
    await Fee.deleteMany({ studentId: testStudentId });

    const invoice = await Fee.create({
      studentId: testStudentId,
      feeType: "Exam",
      amount: 500,
      dueDate: new Date(),
      status: "Pending",
      remarks: "Test invoice",
    });

    if (!invoice || !invoice._id) {
      throw new Error("Failed to create fee invoice record in MongoDB.");
    }

    testFeeId = String(invoice._id);

    // Update status to Paid (simulate payment collection)
    const paidInvoice = await Fee.findByIdAndUpdate(
      testFeeId,
      { status: "Paid", paidDate: new Date(), paymentMethod: "Online", receiptNumber: "REC-DIAG-999" },
      { new: true }
    );

    if (!paidInvoice || paidInvoice.status !== "Paid" || paidInvoice.receiptNumber !== "REC-DIAG-999") {
      throw new Error("Failed to collect payment / update fee invoice record to Paid status in database.");
    }
  });

  // ==========================================
  // FINAL CLEAN UP (CRITICAL!)
  // ==========================================
  try {
    if (testAttendanceId) {
      await Attendance.findByIdAndDelete(testAttendanceId);
    }
    if (testFeeId) {
      await Fee.findByIdAndDelete(testFeeId);
    }
    if (testStudentId) {
      await Student.findByIdAndDelete(testStudentId);
    }
  } catch (cleanUpError) {
    console.error("Diagnostic tests cleanup failed: ", cleanUpError);
  }

  const durationMs = Date.now() - startTime;
  const passedCount = results.filter((r) => r.status === "passed").length;
  const failedCount = results.filter((r) => r.status === "failed").length;

  return NextResponse.json({
    success: failedCount === 0,
    summary: {
      total: results.length,
      passed: passedCount,
      failed: failedCount,
      durationMs,
    },
    results,
  });
}
