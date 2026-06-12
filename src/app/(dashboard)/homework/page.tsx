import HomeworkStats from "@/features/homework/components/HomeworkStats";
import HomeworkList from "@/features/homework/components/HomeworkList";
import SubmissionStats from "@/features/homework/components/SubmissionStats";

export default function HomeworkPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Homework Management</h1>

        <p className="text-muted-foreground">
          Manage assignments and submissions
        </p>
      </div>

      <HomeworkStats />

      <div className="grid gap-6 lg:grid-cols-2">
        <HomeworkList />
        <SubmissionStats />
      </div>
    </div>
  );
}
