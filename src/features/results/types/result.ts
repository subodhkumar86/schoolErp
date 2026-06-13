import type { Student } from "@/features/students/types/student";
import type { ExamType } from "@/features/exams/types/exam";

export interface ResultType {
  _id: string;
  studentId:
    | string
    | Pick<
        Student,
        "_id" | "name" | "rollNumber" | "studentClass" | "section"
      >;
  examId:
    | string
    | Pick<
        ExamType,
        "_id" | "name" | "subject" | "totalMarks" | "passingMarks" | "date"
      >;
  marksObtained: number;
  grade: string;
  remarks?: string;
  createdAt: string;
  updatedAt: string;
}
