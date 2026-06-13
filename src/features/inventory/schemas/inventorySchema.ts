import { z } from "zod";

export const inventorySchema = z.object({
  name: z.string().min(1, "Asset name is required"),
  category: z.enum(["Computer", "Electronics", "Furniture", "Other"]),
  status: z.enum(["Active", "Maintenance", "Retired"]).default("Active"),
  quantity: z.coerce
    .number()
    .min(1, "Quantity must be at least 1"),
  costValue: z.coerce
    .number()
    .min(0, "Cost must be a positive number"),
  purchasedDate: z.string().optional().or(z.literal("")),
  location: z.string().optional().or(z.literal("")),
});

export type InventoryFormValues = z.infer<typeof inventorySchema>;
