import RevenueChart from "@/components/charts/RevenueChart";

export default function RevenueAnalytics() {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Revenue Analytics</h2>

      <RevenueChart />
    </div>
  );
}
