import { z } from "zod";

export const studentSchema = z.object({
  name: z.string().min(2, "Name is required"),

  email: z.string().email("Invalid email").optional(),

  phone: z.string().optional(),

  rollNumber: z.string().min(1, "Roll number is required"),

  studentClass: z.string().min(1, "Class is required"),

  section: z.string().optional(),

  gender: z.enum(["Male", "Female", "Other"]).optional(),

  address: z.string().optional(),

  parentName: z.string().optional(),

  parentPhone: z.string().optional(),
});

export type StudentFormValues = z.infer<typeof studentSchema>;
