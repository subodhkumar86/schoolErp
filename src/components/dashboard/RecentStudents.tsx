"use client";

import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import Loader from "@/components/shared/Loader";

export default function RecentStudents() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) return <Loader />;

  const students = stats?.recentStudents || [];

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold">Recent Admissions</h3>

      <div className="space-y-4">
        {students.length === 0 ? (
          <p className="text-xs text-muted-foreground">No recent enrollments recorded</p>
        ) : (
          students.map((student) => (
            <div key={student._id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
              <span className="font-semibold text-sm text-foreground">{student.name}</span>
              <span className="text-xs rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
                Class {student.studentClass}-{student.section}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
