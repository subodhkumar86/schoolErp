"use client";

import { useParams, useRouter } from "next/navigation";
import EditExamForm from "@/features/exams/components/EditExamForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EditExamPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.id as string;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/exams")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Exam</h1>
          <p className="text-muted-foreground">
            Modify exam configuration and scheduling details
          </p>
        </div>
      </div>

      <EditExamForm examId={examId} />
    </div>
  );
}
