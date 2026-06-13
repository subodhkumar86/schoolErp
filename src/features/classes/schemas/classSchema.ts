import { z } from "zod";

export const classSchema = z.object({
  name: z.string().min(1, "Class name is required"),
  section: z.string().min(1, "Section is required"),
  classTeacher: z.string().optional(),
  capacity: z.coerce.number().min(1, "Capacity must be at least 1").default(40),
  subjectsString: z.string().optional(),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

export type ClassFormValues = z.infer<typeof classSchema>;
