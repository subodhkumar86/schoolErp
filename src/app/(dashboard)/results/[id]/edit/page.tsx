"use client";

import { useParams, useRouter } from "next/navigation";
import EditResultForm from "@/features/results/components/EditResultForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EditResultPage() {
  const params = useParams();
  const router = useRouter();
  const resultId = params.id as string;

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
          <h1 className="text-3xl font-bold">Edit Student Result</h1>
          <p className="text-muted-foreground">
            Modify academic score and evaluation remarks
          </p>
        </div>
      </div>

      <EditResultForm resultId={resultId} />
    </div>
  );
}
