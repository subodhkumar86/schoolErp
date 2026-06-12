"use client";

import CreateTeacherDialog from "./CreateTeacherDialog";

export default function TeachersHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">Teachers</h1>

        <p className="text-muted-foreground">Manage all teachers</p>
      </div>

      <CreateTeacherDialog />
    </div>
  );
}
