"use client";

import CreateClassForm from "@/features/classes/components/CreateClassForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateClassPage() {
  const router = useRouter();

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
          <h1 className="text-3xl font-bold">Add New Class</h1>
          <p className="text-muted-foreground">Create a new class and section</p>
        </div>
      </div>

      <CreateClassForm />
    </div>
  );
}
