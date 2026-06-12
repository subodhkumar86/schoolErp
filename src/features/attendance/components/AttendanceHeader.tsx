"use client";

import MarkAttendanceDialog from "./MarkAttendanceDialog";

export default function AttendanceHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">Attendance</h1>

        <p className="text-muted-foreground">
          Manage student attendance records
        </p>
      </div>

      <MarkAttendanceDialog />
    </div>
  );
}
