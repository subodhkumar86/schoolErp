"use client";

import ResultsHeader from "@/features/results/components/ResultsHeader";
import ResultsStats from "@/features/results/components/ResultsStats";
import ResultsTable from "@/features/results/components/ResultsTable";

export default function ResultsPage() {
  return (
    <div className="space-y-6">
      <ResultsHeader />

      <ResultsStats />

      <ResultsTable />
    </div>
  );
}
