export default function HomeworkStats() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl bg-blue-600 p-6 text-white">
        <p>Total Assignments</p>
        <h2 className="text-3xl font-bold">42</h2>
      </div>

      <div className="rounded-2xl bg-green-600 p-6 text-white">
        <p>Submitted</p>
        <h2 className="text-3xl font-bold">35</h2>
      </div>

      <div className="rounded-2xl bg-orange-500 p-6 text-white">
        <p>Pending</p>
        <h2 className="text-3xl font-bold">7</h2>
      </div>
    </div>
  );
}
