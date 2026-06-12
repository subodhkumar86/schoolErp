import { inventoryStats } from "../mock/inventory";

export default function InventoryStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl bg-blue-600 p-6 text-white">
        <p>Total Assets</p>
        <h2 className="text-3xl font-bold">{inventoryStats.totalAssets}</h2>
      </div>

      <div className="rounded-2xl bg-green-600 p-6 text-white">
        <p>Active Assets</p>
        <h2 className="text-3xl font-bold">{inventoryStats.activeAssets}</h2>
      </div>

      <div className="rounded-2xl bg-orange-500 p-6 text-white">
        <p>Maintenance</p>
        <h2 className="text-3xl font-bold">
          {inventoryStats.maintenanceAssets}
        </h2>
      </div>

      <div className="rounded-2xl bg-red-500 p-6 text-white">
        <p>Retired</p>
        <h2 className="text-3xl font-bold">{inventoryStats.retiredAssets}</h2>
      </div>
    </div>
  );
}
