import { z } from "zod";

export const feeSchema = z.object({
  studentId: z.string().min(1, "Student is required"),
  feeType: z.enum([
    "Tuition",
    "Transport",
    "Library",
    "Hostel",
    "Exam",
    "Sports",
    "Other",
  ]),
  amount: z.coerce
    .number()
    .min(1, "Amount must be at least 1"),
  dueDate: z.string().min(1, "Due Date is required"),
  paidDate: z.string().optional(),
  status: z.enum(["Pending", "Paid", "Overdue", "Partial"]).default("Pending"),
  paymentMethod: z.enum(["Cash", "Online", "Cheque", "DD"]).optional().or(z.literal("")),
  remarks: z.string().optional().default(""),
  receiptNumber: z.string().optional(),
});

export type FeeFormValues = z.infer<typeof feeSchema>;
