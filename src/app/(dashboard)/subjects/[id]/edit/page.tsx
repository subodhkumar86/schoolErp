import EditSubjectForm from "@/features/subjects/components/EditSubjectForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditSubjectPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Subject</h1>
        <p className="text-muted-foreground">Modify details for this academic subject registry</p>
      </div>

      <EditSubjectForm subjectId={id} />
    </div>
  );
}
