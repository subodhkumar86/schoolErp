import { z } from "zod";

export const timetableSchema = z.object({
  classId: z.string().min(1, "Class is required"),
  subject: z.string().min(1, "Subject name is required"),
  teacherId: z.string().min(1, "Teacher is required"),
  dayOfWeek: z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  classroom: z.string().optional().default(""),
});

export type TimetableFormValues = z.infer<typeof timetableSchema>;
