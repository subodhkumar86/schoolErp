import AttendanceChart from "@/components/charts/AttendanceChart";

export default function AttendanceAnalytics() {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Attendance Analytics</h2>

      <AttendanceChart />
    </div>
  );
}
