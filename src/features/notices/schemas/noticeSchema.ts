import { z } from "zod";

export const noticeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  audience: z.enum(["All", "Students", "Teachers"]),
  postedDate: z.string().min(1, "Post date is required"),
  expiryDate: z.string().optional().or(z.literal("")),
  status: z.enum(["Active", "Archived"]).default("Active"),
  createdBy: z.string().min(1, "Created By label is required"),
});

export type NoticeFormValues = z.infer<typeof noticeSchema>;
