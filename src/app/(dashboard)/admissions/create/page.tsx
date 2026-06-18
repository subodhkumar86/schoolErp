"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateAdmissionForm from "@/features/admissions/components/CreateAdmissionForm";

export default function CreateAdmissionPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/admissions")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">New Student Application</h1>
          <p className="text-muted-foreground">
            Submit a new candidate for school enrollment
          </p>
        </div>
      </div>

      <CreateAdmissionForm />
    </div>
  );
}
