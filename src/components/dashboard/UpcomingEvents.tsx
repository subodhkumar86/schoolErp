"use client";

import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import Loader from "@/components/shared/Loader";

export default function UpcomingEvents() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) return <Loader />;

  const exams = stats?.upcomingExams || [];

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-bold">Upcoming Examinations</h3>

      <div className="space-y-3">
        {exams.length === 0 ? (
          <p className="text-xs text-muted-foreground">No upcoming exams scheduled</p>
        ) : (
          exams.map((exam, index) => {
            const colors = [
              "border-l-blue-500",
              "border-l-green-500",
              "border-l-orange-500",
              "border-l-red-500",
              "border-l-purple-500"
            ];
            const borderCol = colors[index % colors.length];

            return (
              <div
                key={exam._id}
                className={`rounded-xl border border-l-4 p-3 ${borderCol}`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm">{exam.name}</h4>
                  <span className="text-xs rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                    Class {exam.className}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">Subject: {exam.subject}</p>
                  <p className="text-xs font-semibold text-primary">
                    {new Date(exam.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
