"use client";

import { useReports } from "../hooks/useReports";
import Loader from "@/components/shared/Loader";

export default function ExamReport() {
  const { data, isLoading } = useReports();

  if (isLoading) return <Loader />;

  const report = data?.examReport || [];

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">Exam Performance</h2>
      <div className="space-y-3">
        {report.map((item) => (
          <div key={item.exam} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
            <span className="font-medium text-foreground max-w-[200px] truncate">{item.exam}</span>
            <span className="rounded-full bg-purple-500/10 px-2.5 py-0.5 text-xs font-semibold text-purple-600">
              {item.average}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
