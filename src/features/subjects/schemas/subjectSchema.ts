import { z } from "zod";

export const subjectSchema = z.object({
  name: z.string().min(2, "Subject name must be at least 2 characters"),
  code: z.string().min(2, "Subject code must be at least 2 characters").toUpperCase(),
  type: z.enum(["Theory", "Practical", "Both"]),
  description: z.string().optional(),
});

export type SubjectFormValues = z.infer<typeof subjectSchema>;
