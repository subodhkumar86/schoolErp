import type { Student } from "@/features/students/types/student";

export type FeeTypeOption =
  | "Tuition"
  | "Transport"
  | "Library"
  | "Hostel"
  | "Exam"
  | "Sports"
  | "Other";

export type FeeStatus = "Pending" | "Paid" | "Overdue" | "Partial";

export type PaymentMethod = "Cash" | "Online" | "Cheque" | "DD";

export interface FeeType {
  _id: string;
  studentId: string | Pick<Student, "_id" | "name" | "rollNumber" | "studentClass">;
  feeType: FeeTypeOption;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: FeeStatus;
  paymentMethod?: PaymentMethod;
  remarks?: string;
  receiptNumber?: string;
  createdAt: string;
  updatedAt: string;
}
