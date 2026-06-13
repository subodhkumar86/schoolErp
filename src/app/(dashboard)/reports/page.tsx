import ReportStats from "@/features/reports/components/ReportStats";
import ExportActions from "@/features/reports/components/ExportActions";
import AttendanceReport from "@/features/reports/components/AttendanceReport";
import FeeReport from "@/features/reports/components/FeeReport";
import ExamReport from "@/features/reports/components/ExamReport";
import StudentReport from "@/features/reports/components/StudentReport";
import TeacherReport from "@/features/reports/components/TeacherReport";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          Analyze real-time school performance metrics, fee payments, and roster distributions
        </p>
      </div>

      <ExportActions />

      <ReportStats />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AttendanceReport />
        <FeeReport />
        <ExamReport />
        <StudentReport />
        <TeacherReport />
      </div>
    </div>
  );
}
