import type { Teacher } from "@/features/teachers/types/teacher";

export interface ClassType {
  _id: string;
  name: string;
  section: string;
  classTeacher?: string | Pick<Teacher, "_id" | "name" | "employeeId">;
  capacity: number;
  subjects: string[];
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}
