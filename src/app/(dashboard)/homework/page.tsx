import HomeworkHeader from "@/features/homework/components/HomeworkHeader";
import HomeworkStats from "@/features/homework/components/HomeworkStats";
import HomeworkTable from "@/features/homework/components/HomeworkTable";

export default function HomeworkPage() {
  return (
    <div className="space-y-6">
      <HomeworkHeader />
      <HomeworkStats />
      <HomeworkTable />
    </div>
  );
}

