"use client";

import { useParams, useRouter } from "next/navigation";
import { useHomework } from "@/features/homework/hooks/useHomework";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import EditHomeworkForm from "@/features/homework/components/EditHomeworkForm";

export default function EditHomeworkPage() {
  const params = useParams();
  const router = useRouter();
  const homeworkId = params.id as string;
  const { data: homework, isLoading } = useHomework(homeworkId);

  if (isLoading) return <Loader />;

  if (!homework) {
    return (
      <div className="rounded-3xl border bg-card p-6 text-center text-muted-foreground">
        Homework assignment not found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(`/homework/${homeworkId}`)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Homework</h1>
          <p className="text-muted-foreground">
            Update homework assignment parameters and instructions
          </p>
        </div>
      </div>

      <EditHomeworkForm homework={homework} />
    </div>
  );
}
