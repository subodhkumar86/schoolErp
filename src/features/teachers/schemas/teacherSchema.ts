import { z } from "zod";

export const teacherSchema = z.object({
  name: z.string().min(2, "Name is required"),

  email: z.string().email("Invalid email").optional().or(z.literal("")),

  phone: z.string().optional(),

  employeeId: z.string().min(1, "Employee ID is required"),

  department: z.string().min(1, "Department is required"),

  qualification: z.string().optional(),

  experience: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? undefined : Number(val)),
    z.number().min(0).optional()
  ),

  salary: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? undefined : Number(val)),
    z.number().min(0).optional()
  ),

  address: z.string().optional(),

  subjects: z.array(z.string()).optional(),

  status: z.enum(["Active", "Inactive", "On Leave"]).optional(),
});

export type TeacherFormValues = z.infer<typeof teacherSchema>;
