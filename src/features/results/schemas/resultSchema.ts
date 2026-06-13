import { z } from "zod";

export const resultSchema = z.object({
  studentId: z.string().min(1, "Please select a student"),
  examId: z.string().min(1, "Please select an exam"),
  marksObtained: z.coerce.number().min(0, "Marks obtained must be at least 0"),
  grade: z.string().optional(),
  remarks: z.string().optional(),
});

export type ResultFormValues = z.infer<typeof resultSchema>;
