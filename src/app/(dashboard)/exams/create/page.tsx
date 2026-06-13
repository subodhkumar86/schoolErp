"use client";

import CreateExamForm from "@/features/exams/components/CreateExamForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateExamPage() {
  const router = useRouter();

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
          <h1 className="text-3xl font-bold">Schedule New Exam</h1>
          <p className="text-muted-foreground">
            Create a new exam schedule and configuration
          </p>
        </div>
      </div>

      <CreateExamForm />
    </div>
  );
}
