import { z } from "zod";

export const admissionSchema = z.object({
  studentName: z.string().min(2, "Student name must be at least 2 characters"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().optional(),
  appliedClass: z.string().min(1, "Class must be specified"),
  gender: z.enum(["Male", "Female", "Other"]),
  dateOfBirth: z.string().optional(),
  parentName: z.string().optional(),
  parentPhone: z.string().optional(),
  address: z.string().optional(),
  status: z.enum(["Pending", "Approved", "Rejected"]).default("Pending"),
});

export type AdmissionFormValues = z.infer<typeof admissionSchema>;
