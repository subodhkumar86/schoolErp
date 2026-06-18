import CreateSubjectForm from "@/features/subjects/components/CreateSubjectForm";

export default function CreateSubjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add Subject</h1>
        <p className="text-muted-foreground">Register a new academic course code and subject catalog</p>
      </div>

      <CreateSubjectForm />
    </div>
  );
}
