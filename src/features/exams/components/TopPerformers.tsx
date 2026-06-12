"use client";

import { useStudents } from "@/features/students/hooks/useStudents";

export default function TopPerformers() {
  const { data: response } = useStudents({ limit: 5 });
  const students = response?.data ?? [];

  return (
    <div className="rounded-3xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Top Students</h2>

      <div className="space-y-4">
        {students.length === 0 ? (
          <p className="text-sm text-muted-foreground">No students found.</p>
        ) : (
          students.map((student) => (
            <div
              key={student._id as string}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {(student.name as string)?.charAt(0)}
                </div>
                <span className="font-medium">{student.name as string}</span>
              </div>

              <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs font-semibold text-green-500">
                {(student.attendance as number) ?? 100}%
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
