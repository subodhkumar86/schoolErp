import { z } from "zod";

export const examSchema = z.object({
  name: z.string().min(1, "Exam name is required"),
  subject: z.string().min(1, "Subject is required"),
  className: z.string().min(1, "Class is required"),
  section: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute"),
  totalMarks: z.coerce.number().min(1, "Total marks must be at least 1"),
  passingMarks: z.coerce.number().min(1, "Passing marks must be at least 1"),
  status: z
    .enum(["Scheduled", "Ongoing", "Completed", "Cancelled"])
    .default("Scheduled"),
  description: z.string().optional(),
});

export type ExamFormValues = z.infer<typeof examSchema>;
