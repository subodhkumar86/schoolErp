import { z } from "zod";

export const notificationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
  type: z.enum(["Info", "Success", "Warning", "Error"]).default("Info"),
  recipient: z.enum(["All", "Students", "Teachers"]).default("All"),
  read: z.boolean().default(false),
  priority: z.enum(["Low", "Normal", "High"]).default("Normal"),
  postedDate: z.string().min(1, "Post date is required"),
});

export type NotificationFormValues = z.infer<typeof notificationSchema>;
