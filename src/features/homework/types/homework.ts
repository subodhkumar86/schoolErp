import type { Teacher } from "@/features/teachers/types/teacher";

export interface HomeworkType {
  _id: string;
  title: string;
  description: string;
  className: string;
  section?: string;
  subject: string;
  dueDate: string;
  status: "Active" | "Closed";
  teacherId?: string | Pick<Teacher, "_id" | "name" | "employeeId">;
  maxPoints: number;
  createdAt: string;
  updatedAt: string;
}
