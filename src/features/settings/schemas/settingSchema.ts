import { z } from "zod";

export const settingSchema = z.object({
  schoolName: z.string().min(1, "School name is required"),
  schoolAddress: z.string().min(1, "School address is required"),
  schoolEmail: z.string().email("Invalid email address"),
  schoolLogo: z.string().default("/images/logo.png"),
  sessionYear: z.string().min(1, "Session year is required"),
  currency: z.string().min(1, "Currency is required"),
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(false),
  language: z.string().default("English"),
  timezone: z.string().default("Asia/Kolkata"),
  dateFormat: z.string().default("DD/MM/YYYY"),
  theme: z.enum(["light", "dark"]).default("light"),
});

export type SettingFormValues = z.infer<typeof settingSchema>;
