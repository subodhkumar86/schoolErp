import { Button } from "@/components/ui/button";

export default function QuickActions() {
  return (
    <div className="rounded-lg border p-6">
      <h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>

      <div className="flex flex-wrap gap-3">
        <Button>Add Student</Button>

        <Button variant="outline">Add Teacher</Button>

        <Button variant="outline">Mark Attendance</Button>

        <Button variant="outline">Create Exam</Button>
      </div>
    </div>
  );
}
