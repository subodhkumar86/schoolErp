"use client";

import { useParams, useRouter } from "next/navigation";
import { useTimetable } from "@/features/timetable/hooks/useTimetable";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import EditTimetableForm from "@/features/timetable/components/EditTimetableForm";

export default function EditTimetablePage() {
  const params = useParams();
  const router = useRouter();
  const slotId = params.id as string;
  const { data: slot, isLoading } = useTimetable(slotId);

  if (isLoading) return <Loader />;

  if (!slot) {
    return (
      <div className="rounded-3xl border bg-card p-6 text-center text-muted-foreground">
        Timetable slot not found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(`/timetable/${slotId}`)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Schedule Slot</h1>
          <p className="text-muted-foreground">
            Update period times, days, subjects, classrooms, or assigned teachers
          </p>
        </div>
      </div>

      <EditTimetableForm slot={slot} />
    </div>
  );
}
