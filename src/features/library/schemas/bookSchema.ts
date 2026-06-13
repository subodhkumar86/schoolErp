import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  isbn: z.string().optional().or(z.literal("")),
  category: z.enum([
    "Mathematics",
    "Science",
    "English",
    "History",
    "Fiction",
    "Other",
  ]),
  totalCopies: z.coerce
    .number()
    .min(1, "Must have at least 1 copy"),
  availableCopies: z.coerce
    .number()
    .min(0, "Available copies cannot be negative"),
  shelfLocation: z.string().optional().or(z.literal("")),
  status: z.enum(["Available", "Out of Stock", "Reserved"]).default("Available"),
});

export type BookFormValues = z.infer<typeof bookSchema>;
