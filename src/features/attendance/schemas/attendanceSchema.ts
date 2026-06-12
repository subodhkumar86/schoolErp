import { z } from "zod";

export const attendanceSchema = z.object({
  studentId: z.string(),

  date: z.string(),

  status: z.enum(["Present", "Absent", "Late"]),

  remarks: z.string().optional(),
});

export type AttendanceFormValues = z.infer<typeof attendanceSchema>;
