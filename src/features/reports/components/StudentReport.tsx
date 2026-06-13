"use client";

import { useReports } from "../hooks/useReports";
import Loader from "@/components/shared/Loader";

export default function StudentReport() {
  const { data, isLoading } = useReports();

  if (isLoading) return <Loader />;

  const report = data?.studentReport || [];

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">Students by Class</h2>
      <div className="space-y-3">
        {report.length === 0 ? (
          <p className="text-sm text-muted-foreground">No student data recorded</p>
        ) : (
          report.map((item) => (
            <div key={item.className} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
              <span className="font-medium text-foreground">Class {item.className}</span>
              <span className="rounded-full bg-orange-500/10 px-2.5 py-0.5 text-xs font-semibold text-orange-600">
                {item.count} Students
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
