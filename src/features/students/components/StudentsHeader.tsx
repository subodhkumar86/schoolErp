"use client";

import CreateStudentDialog from "./CreateStudentDialog";

export default function StudentsHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">Students</h1>

        <p className="text-muted-foreground">Manage all students</p>
      </div>

      <CreateStudentDialog />
    </div>
  );
}
