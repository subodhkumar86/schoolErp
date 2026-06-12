import FeeStats from "@/features/fees/components/FeeStats";
import RevenueAnalytics from "@/features/fees/components/RevenueAnalytics";
import FeeCollectionTable from "@/features/fees/components/FeeCollectionTable";
import PendingFeesTable from "@/features/fees/components/PendingFeesTable";

export default function FeesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Fees Management</h1>

        <p className="text-muted-foreground">
          Manage fee collection and revenue
        </p>
      </div>

      <FeeStats />

      <RevenueAnalytics />

      <div className="grid gap-6 lg:grid-cols-2">
        <FeeCollectionTable />
        <PendingFeesTable />
      </div>
    </div>
  );
}
