import { feeReport } from "../mock/reports";

export default function FeeReport() {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Fee Report</h2>

      <div className="space-y-3">
        {feeReport.map((item) => (
          <div key={item.month} className="flex justify-between">
            <span>{item.month}</span>
            <span>{item.revenue}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
