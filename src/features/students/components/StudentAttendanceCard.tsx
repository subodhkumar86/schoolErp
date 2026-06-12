export default function StudentAttendanceCard() {
  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-semibold">Attendance</h3>

      <div className="text-5xl font-bold text-green-500">96%</div>

      <p className="mt-2 text-muted-foreground">Current Attendance</p>
    </div>
  );
}
