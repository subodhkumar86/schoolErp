import { z } from "zod";

export const transportSchema = z.object({
  routeName: z.string().min(1, "Route name is required"),
  vehicleNumber: z.string().min(1, "Vehicle number is required"),
  driverName: z.string().min(1, "Driver name is required"),
  driverPhone: z.string().min(1, "Driver phone number is required"),
  routeCost: z.coerce
    .number()
    .min(0, "Cost must be a positive number"),
  capacity: z.coerce
    .number()
    .min(1, "Capacity must be at least 1 seat"),
  status: z.enum(["Active", "Maintenance", "Inactive"]).default("Active"),
});

export type TransportFormValues = z.infer<typeof transportSchema>;
