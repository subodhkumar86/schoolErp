import { examReport } from "../mock/reports";

export default function ExamReport() {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Exam Report</h2>

      <div className="space-y-3">
        {examReport.map((item) => (
          <div key={item.exam} className="flex justify-between">
            <span>{item.exam}</span>
            <span>{item.average}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
