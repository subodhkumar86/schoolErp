"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateHomeworkForm from "@/features/homework/components/CreateHomeworkForm";

export default function CreateHomeworkPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/homework")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create Homework</h1>
          <p className="text-muted-foreground">
            Create and assign a new homework task
          </p>
        </div>
      </div>

      <CreateHomeworkForm />
    </div>
  );
}
