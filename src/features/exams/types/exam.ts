export interface ExamType {
  _id: string;
  name: string;
  subject: string;
  className: string;
  section?: string;
  date: string;
  duration: number; // in minutes
  totalMarks: number;
  passingMarks: number;
  status: "Scheduled" | "Ongoing" | "Completed" | "Cancelled";
  description?: string;
  createdAt: string;
  updatedAt: string;
}
