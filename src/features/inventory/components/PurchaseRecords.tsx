import { purchases } from "../mock/inventory";

export default function PurchaseRecords() {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Recent Purchases</h2>

      <div className="space-y-4">
        {purchases.map((purchase) => (
          <div key={purchase.id} className="rounded-xl border p-4">
            <p className="font-semibold">{purchase.item}</p>

            <p className="text-sm text-muted-foreground">{purchase.date}</p>

            <p className="mt-2 font-medium">{purchase.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
