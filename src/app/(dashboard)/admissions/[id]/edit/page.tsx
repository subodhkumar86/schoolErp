"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditAdmissionForm from "@/features/admissions/components/EditAdmissionForm";

export default function EditAdmissionPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Application</h1>
          <p className="text-muted-foreground">Modify admission applicant details</p>
        </div>
      </div>

      <EditAdmissionForm />
    </div>
  );
}
