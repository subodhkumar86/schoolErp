"use client";

import { useParams, useRouter } from "next/navigation";
import EditClassForm from "@/features/classes/components/EditClassForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EditClassPage() {
  const params = useParams();
  const router = useRouter();
  const classId = params.id as string;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/classes")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Class</h1>
          <p className="text-muted-foreground">Modify class configuration</p>
        </div>
      </div>

      <EditClassForm classId={classId} />
    </div>
  );
}
