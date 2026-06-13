"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { inventorySchema, type InventoryFormValues } from "../schemas/inventorySchema";
import { useUpdateInventory } from "../hooks/useUpdateInventory";
import type { InventoryType } from "../types/inventory";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface EditInventoryFormProps {
  asset: InventoryType;
}

export default function EditInventoryForm({ asset }: EditInventoryFormProps) {
  const router = useRouter();
  const updateInventory = useUpdateInventory();

  // Format date for html5 input type="date"
  let formattedPurchasedDate = "";
  if (asset.purchasedDate) {
    try {
      formattedPurchasedDate = new Date(asset.purchasedDate).toISOString().split("T")[0];
    } catch {
      formattedPurchasedDate = asset.purchasedDate.split("T")[0] || "";
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InventoryFormValues>({
    resolver: zodResolver(inventorySchema) as unknown as Resolver<InventoryFormValues>,
    defaultValues: {
      name: asset.name || "",
      category: asset.category || "Other",
      status: asset.status || "Active",
      quantity: asset.quantity || 1,
      costValue: asset.costValue || 0,
      purchasedDate: formattedPurchasedDate,
      location: asset.location || "",
    },
  });

  const onSubmit = async (data: InventoryFormValues) => {
    try {
      await updateInventory.mutateAsync({
        id: asset._id,
        data,
      });
      toast.success("Asset details updated successfully");
      router.push(`/inventory/${asset._id}`);
    } catch (error) {
      toast.error("Failed to update asset details");
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
          <Label htmlFor="name">Asset Name</Label>
          <Input
            id="name"
            placeholder="e.g. Dell OptiPlex Desktop, Library Table"
            {...register("name")}
            className="mt-1"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              {...register("category")}
              className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
            >
              <option value="Computer">Computer</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="status">Availability Status</Label>
            <select
              id="status"
              {...register("status")}
              className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
            >
              <option value="Active">Active</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Retired">Retired</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              {...register("quantity")}
              className="mt-1"
            />
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-500">
                {errors.quantity.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="costValue">Cost Value (₹)</Label>
            <Input
              id="costValue"
              type="number"
              {...register("costValue")}
              className="mt-1"
            />
            {errors.costValue && (
              <p className="mt-1 text-sm text-red-500">
                {errors.costValue.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="purchasedDate">Purchased Date</Label>
            <Input
              id="purchasedDate"
              type="date"
              {...register("purchasedDate")}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="location">Location / Placement</Label>
            <Input
              id="location"
              placeholder="e.g. Computer Lab 1, Room 202"
              {...register("location")}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(`/inventory/${asset._id}`)}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={updateInventory.isPending}
        >
          {updateInventory.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
