"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { transportSchema, type TransportFormValues } from "../schemas/transportSchema";
import { useUpdateTransport } from "../hooks/useUpdateTransport";
import type { TransportType } from "../types/transport";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface EditTransportFormProps {
  route: TransportType;
}

export default function EditTransportForm({ route }: EditTransportFormProps) {
  const router = useRouter();
  const updateRoute = useUpdateTransport();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransportFormValues>({
    resolver: zodResolver(transportSchema) as unknown as Resolver<TransportFormValues>,
    defaultValues: {
      routeName: route.routeName || "",
      vehicleNumber: route.vehicleNumber || "",
      driverName: route.driverName || "",
      driverPhone: route.driverPhone || "",
      routeCost: route.routeCost || 0,
      capacity: route.capacity || 40,
      status: route.status || "Active",
    },
  });

  const onSubmit = async (data: TransportFormValues) => {
    try {
      await updateRoute.mutateAsync({
        id: route._id,
        data,
      });
      toast.success("Transport route details updated successfully");
      router.push(`/transport/${route._id}`);
    } catch (error) {
      toast.error("Failed to update route details");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-xl bg-card border rounded-3xl p-8 shadow-sm"
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="routeName">Route Name / Path</Label>
          <Input
            id="routeName"
            placeholder="e.g. Route 4 - Central Rohini"
            {...register("routeName")}
            className="mt-1"
          />
          {errors.routeName && (
            <p className="mt-1 text-sm text-red-500">{errors.routeName.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="vehicleNumber">Vehicle Number</Label>
            <Input
              id="vehicleNumber"
              placeholder="e.g. DL-1CA-1234"
              {...register("vehicleNumber")}
              className="mt-1"
            />
            {errors.vehicleNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.vehicleNumber.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="capacity">Seating Capacity</Label>
            <Input
              id="capacity"
              type="number"
              {...register("capacity")}
              className="mt-1"
            />
            {errors.capacity && (
              <p className="mt-1 text-sm text-red-500">{errors.capacity.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="driverName">Driver Name</Label>
            <Input
              id="driverName"
              placeholder="e.g. Mukesh Yadav"
              {...register("driverName")}
              className="mt-1"
            />
            {errors.driverName && (
              <p className="mt-1 text-sm text-red-500">{errors.driverName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="driverPhone">Driver Phone</Label>
            <Input
              id="driverPhone"
              placeholder="e.g. +91 9876543210"
              {...register("driverPhone")}
              className="mt-1"
            />
            {errors.driverPhone && (
              <p className="mt-1 text-sm text-red-500">{errors.driverPhone.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="routeCost">Monthly Route Cost (₹)</Label>
            <Input
              id="routeCost"
              type="number"
              placeholder="e.g. 1500"
              {...register("routeCost")}
              className="mt-1"
            />
            {errors.routeCost && (
              <p className="mt-1 text-sm text-red-500">{errors.routeCost.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="status">Fleet Status</Label>
            <select
              id="status"
              {...register("status")}
              className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
            >
              <option value="Active">Active</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(`/transport/${route._id}`)}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={updateRoute.isPending}
        >
          {updateRoute.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
