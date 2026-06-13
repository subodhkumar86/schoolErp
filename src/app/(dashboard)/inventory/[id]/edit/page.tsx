"use client";

import { useParams, useRouter } from "next/navigation";
import { useInventory } from "@/features/inventory/hooks/useInventory";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import EditInventoryForm from "@/features/inventory/components/EditInventoryForm";

export default function EditAssetPage() {
  const params = useParams();
  const router = useRouter();
  const assetId = params.id as string;
  const { data: asset, isLoading } = useInventory(assetId);

  if (isLoading) return <Loader />;

  if (!asset) {
    return (
      <div className="rounded-3xl border bg-card p-6 text-center text-muted-foreground">
        Asset not found in inventory
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(`/inventory/${assetId}`)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Asset</h1>
          <p className="text-muted-foreground">
            Update properties, location, or quantity of school equipment item
          </p>
        </div>
      </div>

      <EditInventoryForm asset={asset} />
    </div>
  );
}
