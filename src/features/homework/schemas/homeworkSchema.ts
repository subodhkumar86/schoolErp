import { z } from "zod";

export const homeworkSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  className: z.string().min(1, "Class Name is required"),
  section: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  dueDate: z.string().min(1, "Due Date is required"),
  status: z.enum(["Active", "Closed"]).default("Active"),
  teacherId: z.string().optional(),
  maxPoints: z.coerce
    .number()
    .min(1, "Points must be at least 1")
    .default(100),
});

export type HomeworkFormValues = z.infer<typeof homeworkSchema>;
