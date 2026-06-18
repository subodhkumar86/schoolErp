"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PromoteStudentsForm from "@/features/students/components/PromoteStudentsForm";

export default function PromoteStudentsPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/students")}
          className="rounded-xl"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Class Promotion & Rollover</h1>
          <p className="text-muted-foreground">
            Promote selected student batches to their next academic class level
          </p>
        </div>
      </div>

      <PromoteStudentsForm />
    </div>
  );
}
