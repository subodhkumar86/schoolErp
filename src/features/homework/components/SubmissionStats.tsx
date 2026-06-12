export default function SubmissionStats() {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Submission Overview</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Class 10-A</span>
          <span>90%</span>
        </div>

        <div className="flex justify-between">
          <span>Class 9-B</span>
          <span>84%</span>
        </div>

        <div className="flex justify-between">
          <span>Class 8-A</span>
          <span>95%</span>
        </div>
      </div>
    </div>
  );
}
