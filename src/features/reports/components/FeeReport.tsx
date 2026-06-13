"use client";

import { useReports } from "../hooks/useReports";
import Loader from "@/components/shared/Loader";

export default function FeeReport() {
  const { data, isLoading } = useReports();

  if (isLoading) return <Loader />;

  const report = data?.feeReport || [];

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">Fee Revenue Trends</h2>
      <div className="space-y-3">
        {report.map((item) => (
          <div key={item.month} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
            <span className="font-medium text-foreground">{item.month}</span>
            <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-600">
              {item.revenue}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
