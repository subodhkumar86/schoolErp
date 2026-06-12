import { attendanceReport } from "../mock/reports";

export default function AttendanceReport() {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Attendance Report</h2>

      <div className="space-y-3">
        {attendanceReport.map((item) => (
          <div key={item.month} className="flex justify-between">
            <span>{item.month}</span>
            <span>{item.attendance}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
