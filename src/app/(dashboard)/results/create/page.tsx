"use client";

import CreateResultForm from "@/features/results/components/CreateResultForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateResultPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/results")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Record Student Result</h1>
          <p className="text-muted-foreground">
            Add score and grade metrics for a student
          </p>
        </div>
      </div>

      <CreateResultForm />
    </div>
  );
}
