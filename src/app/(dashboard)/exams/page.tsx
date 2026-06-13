"use client";

import ExamsHeader from "@/features/exams/components/ExamsHeader";
import ExamStats from "@/features/exams/components/ExamStats";
import ExamsTable from "@/features/exams/components/ExamsTable";

export default function ExamsPage() {
  return (
    <div className="space-y-6">
      <ExamsHeader />

      <ExamStats />

      <ExamsTable />
    </div>
  );
}
