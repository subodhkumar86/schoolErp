"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { inventorySchema, type InventoryFormValues } from "../schemas/inventorySchema";
import { useCreateInventory } from "../hooks/useCreateInventory";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CreateInventoryForm() {
  const router = useRouter();
  const createInventory = useCreateInventory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InventoryFormValues>({
    resolver: zodResolver(inventorySchema) as unknown as Resolver<InventoryFormValues>,
    defaultValues: {
      name: "",
      category: "Other",
      status: "Active",
      quantity: 1,
      costValue: 0,
      purchasedDate: new Date().toISOString().split("T")[0],
      location: "",
    },
  });

  const onSubmit = async (data: InventoryFormValues) => {
    try {
      await createInventory.mutateAsync(data);
      toast.success("Asset added to inventory successfully");
      router.push("/inventory");
    } catch (error) {
      toast.error("Failed to record asset");
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
          onClick={() => router.push("/inventory")}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={createInventory.isPending}
        >
          {createInventory.isPending ? "Adding..." : "Add Asset"}
        </Button>
      </div>
    </form>
  );
}
