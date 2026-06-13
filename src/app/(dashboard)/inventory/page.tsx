import InventoryHeader from "@/features/inventory/components/InventoryHeader";
import InventoryStats from "@/features/inventory/components/InventoryStats";
import AssetsTable from "@/features/inventory/components/AssetsTable";
import AssetCategories from "@/features/inventory/components/AssetCategories";
import PurchaseRecords from "@/features/inventory/components/PurchaseRecords";

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <InventoryHeader />

      <InventoryStats />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <AssetsTable />
        </div>
        <div className="space-y-6">
          <AssetCategories />
          <PurchaseRecords />
        </div>
      </div>
    </div>
  );
}

