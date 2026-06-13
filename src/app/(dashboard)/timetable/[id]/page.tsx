"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useTimetable } from "@/features/timetable/hooks/useTimetable";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil, Clock, Calendar, User, Layout, MapPin } from "lucide-react";

export default function TimetableDetailPage() {
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

  const classObj = typeof slot.classId === "object" ? slot.classId : null;
  const teacherObj = typeof slot.teacherId === "object" ? slot.teacherId : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/timetable")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Schedule Slot Details</h1>
            <p className="text-muted-foreground">
              Detailed allocations for class period
            </p>
          </div>
        </div>

        <Link href={`/timetable/${slotId}/edit`} passHref legacyBehavior>
          <Button className="flex items-center gap-2">
            <Pencil className="h-4 w-4" />
            Edit Slot
          </Button>
        </Link>
      </div>

      <div className="rounded-3xl border bg-card p-8 shadow-sm space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b pb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{slot.subject}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Slot ID: {slot._id}
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <Layout className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Target Class
              </p>
              <h4 className="font-bold text-lg mt-1">
                {classObj ? `Class ${classObj.name}-${classObj.section}` : "N/A"}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Classroom group
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-green-500/10 p-3 text-green-500">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Day of Week
              </p>
              <h4 className="font-bold text-lg mt-1">{slot.dayOfWeek}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Weekly schedule
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Timing Slots
              </p>
              <h4 className="font-bold text-lg mt-1">
                {slot.startTime} - {slot.endTime}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Period Duration
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-orange-500/10 p-3 text-orange-500">
              <User className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Teacher Assigned
              </p>
              <h4 className="font-bold text-lg mt-1">
                {teacherObj?.name || "N/A"}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Academic faculty
              </p>
            </div>
          </div>
        </div>

        {slot.classroom && (
          <div className="rounded-2xl border p-5 flex items-start gap-4 max-w-sm">
            <div className="rounded-xl bg-purple-500/10 p-3 text-purple-500">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Classroom Room No.
              </p>
              <h4 className="font-bold text-lg mt-1">{slot.classroom}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Physical location
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
