"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useInventory } from "@/features/inventory/hooks/useInventory";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil, Package, Compass, Calendar, DollarSign } from "lucide-react";

export default function AssetDetailPage() {
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/inventory")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Asset Details</h1>
            <p className="text-muted-foreground">
              Detailed tracking profile of inventory asset
            </p>
          </div>
        </div>

        <Link href={`/inventory/${assetId}/edit`} passHref legacyBehavior>
          <Button className="flex items-center gap-2">
            <Pencil className="h-4 w-4" />
            Edit Asset
          </Button>
        </Link>
      </div>

      <div className="rounded-3xl border bg-card p-8 shadow-sm space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b pb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{asset.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Asset ID: {asset._id}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-3.5 py-1 text-xs font-semibold ${
                asset.status === "Active"
                  ? "bg-green-500/20 text-green-600"
                  : asset.status === "Maintenance"
                    ? "bg-orange-500/20 text-orange-600"
                    : "bg-red-500/20 text-red-600"
              }`}
            >
              {asset.status}
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Category & Quantity
              </p>
              <h4 className="font-bold text-lg mt-1">{asset.category}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Quantity: {asset.quantity} units
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-green-500/10 p-3 text-green-500">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Cost Valuation
              </p>
              <h4 className="font-bold text-lg mt-1 text-green-600">
                ₹{(asset.costValue || 0).toLocaleString()}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Total purchase cost
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Purchased Date
              </p>
              <h4 className="font-bold text-lg mt-1">
                {asset.purchasedDate ? new Date(asset.purchasedDate).toLocaleDateString() : "—"}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Acquisition record date
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-orange-500/10 p-3 text-orange-500">
              <Compass className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Placement Location
              </p>
              <h4 className="font-bold text-lg mt-1">
                {asset.location || "Not Assigned"}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Physical room code / lab placement
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
