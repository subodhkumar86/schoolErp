import { z } from "zod";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

// Load local environment variables if present
const localEnvPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(localEnvPath)) {
  const envConfig = dotenv.parse(fs.readFileSync(localEnvPath));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}

// Inline mock/re-import validation schemas to avoid Next.js module resolver conflicts in pure node env
// We will test the schema validation logic directly
import { studentSchema } from "../features/students/schemas/studentSchema";
import { attendanceSchema } from "../features/attendance/schemas/attendanceSchema";
import { feeSchema } from "../features/fees/schemas/feeSchema";
import { hashPassword, comparePassword, signJWT, verifyJWT } from "../lib/auth";

const loginSchema = z.object({
  identifier: z.string().min(3, "Username or Email must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
});

interface LocalTestCase {
  name: string;
  fn: () => void | Promise<void>;
}

const suites: Record<string, LocalTestCase[]> = {
  "Smoke Checks": [
    {
      name: "JWT Secret Defined",
      fn: () => {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
          throw new Error("JWT_SECRET is not defined in environment.");
        }
        if (secret.length < 16) {
          throw new Error("JWT_SECRET should be at least 16 characters for security.");
        }
      },
    },
    {
      name: "MongoDB Connection URI Defined",
      fn: () => {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
          throw new Error("MONGODB_URI is not defined in environment.");
        }
        if (!uri.startsWith("mongodb")) {
          throw new Error("MONGODB_URI does not start with mongodb protocol.");
        }
      },
    },
  ],
  "Validation Schemas": [
    {
      name: "Login Schema Validation (Valid)",
      fn: () => {
        const result = loginSchema.safeParse({
          identifier: "admin@school.com",
          password: "password123",
          rememberMe: true,
        });
        if (!result.success) {
          throw new Error("Valid login schema failed validation: " + JSON.stringify(result.error.format()));
        }
      },
    },
    {
      name: "Login Schema Validation (Invalid)",
      fn: () => {
        const result = loginSchema.safeParse({
          identifier: "ad", // too short
          password: "123", // too short
          rememberMe: "yes", // should be boolean
        });
        if (result.success) {
          throw new Error("Invalid login payload bypassed validation checks.");
        }
      },
    },
    {
      name: "Student Schema Validation (Valid)",
      fn: () => {
        const result = studentSchema.safeParse({
          name: "Alice Smith",
          email: "alice@school.com",
          rollNumber: "S-102-B",
          studentClass: "Class 9",
          section: "B",
          gender: "Female",
        });
        if (!result.success) {
          throw new Error("Valid student schema failed validation: " + JSON.stringify(result.error.format()));
        }
      },
    },
    {
      name: "Student Schema Validation (Invalid)",
      fn: () => {
        const result = studentSchema.safeParse({
          email: "invalid-email-string",
          rollNumber: "", // roll number is required
        });
        if (result.success) {
          throw new Error("Invalid student payload bypassed validation checks.");
        }
      },
    },
    {
      name: "Attendance Schema Validation (Valid)",
      fn: () => {
        const result = attendanceSchema.safeParse({
          studentId: "650c1f6d9d146c2b189999a0",
          date: "2026-06-13",
          status: "Late",
          remarks: "Missed the school bus",
        });
        if (!result.success) {
          throw new Error("Valid attendance schema failed validation: " + JSON.stringify(result.error.format()));
        }
      },
    },
    {
      name: "Attendance Schema Validation (Invalid Status)",
      fn: () => {
        const result = attendanceSchema.safeParse({
          studentId: "650c1f6d9d146c2b189999a0",
          date: "2026-06-13",
          status: "Holiday", // Invalid enum status
        });
        if (result.success) {
          throw new Error("Invalid attendance status (Holiday) bypassed validation.");
        }
      },
    },
    {
      name: "Fee Schema Validation (Valid)",
      fn: () => {
        const result = feeSchema.safeParse({
          studentId: "650c1f6d9d146c2b189999a0",
          feeType: "Tuition",
          amount: 2500,
          dueDate: "2026-07-01",
          status: "Pending",
        });
        if (!result.success) {
          throw new Error("Valid fee schema failed validation: " + JSON.stringify(result.error.format()));
        }
      },
    },
    {
      name: "Fee Schema Validation (Invalid Amount)",
      fn: () => {
        const result = feeSchema.safeParse({
          studentId: "650c1f6d9d146c2b189999a0",
          feeType: "Tuition",
          amount: 0, // must be at least 1
          dueDate: "",
        });
        if (result.success) {
          throw new Error("Invalid fee amount (0) bypassed validation.");
        }
      },
    },
  ],
  "Security & Crypto Flows": [
    {
      name: "Bcrypt Hashing Integrity",
      fn: async () => {
        const pass = "StaffAdminPass_2026";
        const hash = await hashPassword(pass);
        if (!hash || hash === pass) {
          throw new Error("Hashing function returned plain text or empty hash.");
        }
        const checkValid = await comparePassword(pass, hash);
        if (!checkValid) {
          throw new Error("Valid password comparison failed.");
        }
        const checkInvalid = await comparePassword("WrongPass", hash);
        if (checkInvalid) {
          throw new Error("Incorrect password matched the hash.");
        }
      },
    },
    {
      name: "JWT Authentication Tokens",
      fn: async () => {
        const payload = {
          userId: "650c1f6d9d146c2b189999b1",
          username: "staffuser",
          email: "staff@school.com",
          role: "Teacher",
        };
        const token = await signJWT(payload);
        if (!token) {
          throw new Error("Failed to sign JWT token.");
        }
        const decoded = await verifyJWT(token);
        if (!decoded) {
          throw new Error("Failed to verify signed JWT token.");
        }
        if (decoded.role !== "Teacher" || decoded.username !== "staffuser") {
          throw new Error("Decoded JWT payload contains incorrect properties.");
        }
      },
    },
  ],
};

async function main() {
  console.log("\n==============================================");
  console.log("    EDUFACT SYSTEM TEST SUITE RUNNER");
  console.log("==============================================\n");

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;
  const startSuiteTime = Date.now();

  for (const suiteName of Object.keys(suites)) {
    console.log(`\n▶ Suite: ${suiteName}`);
    console.log("----------------------------------------------");

    for (const testCase of suites[suiteName]) {
      totalTests++;
      const startTest = Date.now();
      try {
        await testCase.fn();
        const duration = Date.now() - startTest;
        console.log(`  ✔ [PASS] ${testCase.name} (${duration}ms)`);
        passedTests++;
      } catch (err: unknown) {
        const error = err as Error;
        failedTests++;
        console.error(`  ❌ [FAIL] ${testCase.name}`);
        console.error(`     Error: ${error.message || String(error)}`);
      }
    }
  }

  const durationMs = Date.now() - startSuiteTime;

  console.log("\n==============================================");
  console.log("               TEST SUMMARY");
  console.log("==============================================");
  console.log(`  Total Test Cases:  ${totalTests}`);
  console.log(`  Passed Tests:      \x1b[32m${passedTests}\x1b[0m`);
  console.log(`  Failed Tests:      ${failedTests > 0 ? `\x1b[31m${failedTests}\x1b[0m` : `\x1b[32m0\x1b[0m`}`);
  console.log(`  Execution Time:    ${durationMs}ms`);
  console.log("==============================================\n");

  if (failedTests > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("Test runner failed unexpectedly:", err);
  process.exit(1);
});
