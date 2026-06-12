import CreateStudentForm from "@/features/students/components/CreateStudentForm";

export default function CreateStudentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add Student</h1>

        <p className="text-muted-foreground">Create a new student record</p>
      </div>

      <CreateStudentForm />
    </div>
  );
}
