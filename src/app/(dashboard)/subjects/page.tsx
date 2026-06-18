import SubjectsHeader from "@/features/subjects/components/SubjectsHeader";
import SubjectsTable from "@/features/subjects/components/SubjectsTable";

export default function SubjectsPage() {
  return (
    <div className="space-y-6">
      <SubjectsHeader />
      <SubjectsTable />
    </div>
  );
}
