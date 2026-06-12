const students = [
  {
    id: 1,
    name: "Rahul Sharma",
    class: "10-A",
  },
  {
    id: 2,
    name: "Priya Singh",
    class: "9-B",
  },
  {
    id: 3,
    name: "Amit Kumar",
    class: "8-A",
  },
];

export default function RecentStudents() {
  return (
    <div className="rounded-lg border p-6">
      <h3 className="mb-4 text-lg font-semibold">Recent Students</h3>

      <div className="space-y-4">
        {students.map((student) => (
          <div key={student.id} className="flex items-center justify-between">
            <span>{student.name}</span>

            <span className="text-sm text-muted-foreground">
              {student.class}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
