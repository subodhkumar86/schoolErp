"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TimetableHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">Class Timetable</h1>
        <p className="text-muted-foreground">
          Organize, schedule, and track weekly class periods, subjects, and teacher allocations
        </p>
      </div>

      <Button asChild className="flex items-center gap-2">
        <Link href="/timetable/create">
          <Plus className="h-4 w-4" />
          Schedule Slot
        </Link>
      </Button>
    </div>
  );
}
