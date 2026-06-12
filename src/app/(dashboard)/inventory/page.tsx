import InventoryStats from "@/features/inventory/components/InventoryStats";
import AssetsTable from "@/features/inventory/components/AssetsTable";
import AssetCategories from "@/features/inventory/components/AssetCategories";
import PurchaseRecords from "@/features/inventory/components/PurchaseRecords";

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inventory Management</h1>

        <p className="text-muted-foreground">
          Track school assets and purchases
        </p>
      </div>

      <InventoryStats />

      <div className="grid gap-6 lg:grid-cols-2">
        <AssetCategories />
        <PurchaseRecords />
      </div>

      <AssetsTable />
    </div>
  );
}
