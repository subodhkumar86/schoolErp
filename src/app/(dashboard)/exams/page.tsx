import ExamStats from "@/features/exams/components/ExamStats";
import ExamScheduleTable from "@/features/exams/components/ExamScheduleTable";
import ResultsTable from "@/features/exams/components/ResultsTable";
import TopPerformers from "@/features/exams/components/TopPerformers";

export default function ExamsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Examination Management</h1>

        <p className="text-muted-foreground">Manage exams and results</p>
      </div>

      <ExamStats />

      <div className="grid gap-6 lg:grid-cols-2">
        <ExamScheduleTable />
        <TopPerformers />
      </div>

      <ResultsTable />
    </div>
  );
}
