"use client";

import { useExams } from "../hooks/useExams";

export default function ExamStats() {
  const { data: response } = useExams();
  const exams = response?.data ?? [];
  const total = response?.total ?? 0;

  const completed = exams.filter((e) => e.status === "Completed").length;
  const upcoming = exams.filter((e) => e.status === "Scheduled").length;
  const ongoing = exams.filter((e) => e.status === "Ongoing").length;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">Total Exams</p>
        <h2 className="mt-2 text-3xl font-bold">{total}</h2>
      </div>

      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">Completed</p>
        <h2 className="mt-2 text-3xl font-bold text-green-500">{completed}</h2>
      </div>

      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">Upcoming</p>
        <h2 className="mt-2 text-3xl font-bold text-orange-500">{upcoming}</h2>
      </div>

      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">Ongoing</p>
        <h2 className="mt-2 text-3xl font-bold text-blue-500">{ongoing}</h2>
      </div>
    </div>
  );
}
