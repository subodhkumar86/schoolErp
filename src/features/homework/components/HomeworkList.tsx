import { homeworkData } from "../mock/homework";

export default function HomeworkList() {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <h2 className="mb-6 text-xl font-semibold">Homework Assignments</h2>

      <div className="space-y-4">
        {homeworkData.map((homework) => (
          <div key={homework.id} className="rounded-xl border p-4">
            <h3 className="font-semibold">{homework.title}</h3>

            <p className="text-sm text-muted-foreground">{homework.subject}</p>

            <div className="mt-3 flex justify-between text-sm">
              <span>Due: {homework.dueDate}</span>

              <span>{homework.submissions} submissions</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
