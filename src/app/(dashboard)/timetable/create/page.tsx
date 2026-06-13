"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateTimetableForm from "@/features/timetable/components/CreateTimetableForm";

export default function CreateTimetablePage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/timetable")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Schedule Period Slot</h1>
          <p className="text-muted-foreground">
            Register a class period, day of week, subject, and assign a teacher
          </p>
        </div>
      </div>

      <CreateTimetableForm />
    </div>
  );
}
