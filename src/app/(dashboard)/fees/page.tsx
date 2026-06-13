import FeesHeader from "@/features/fees/components/FeesHeader";
import FeeStats from "@/features/fees/components/FeeStats";
import RevenueAnalytics from "@/features/fees/components/RevenueAnalytics";
import FeesTable from "@/features/fees/components/FeesTable";

export default function FeesPage() {
  return (
    <div className="space-y-6">
      <FeesHeader />

      <FeeStats />

      <RevenueAnalytics />

      <FeesTable />
    </div>
  );
}

