import { reportStats } from "../mock/reports";

export default function ReportStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl bg-blue-600 p-6 text-white">
        <p>Attendance Rate</p>
        <h2 className="text-3xl font-bold">{reportStats.attendanceRate}</h2>
      </div>

      <div className="rounded-2xl bg-green-600 p-6 text-white">
        <p>Fee Collection</p>
        <h2 className="text-3xl font-bold">{reportStats.feeCollection}</h2>
      </div>

      <div className="rounded-2xl bg-purple-600 p-6 text-white">
        <p>Exam Average</p>
        <h2 className="text-3xl font-bold">{reportStats.examAverage}</h2>
      </div>

      <div className="rounded-2xl bg-orange-500 p-6 text-white">
        <p>Students</p>
        <h2 className="text-3xl font-bold">{reportStats.activeStudents}</h2>
      </div>
    </div>
  );
}
