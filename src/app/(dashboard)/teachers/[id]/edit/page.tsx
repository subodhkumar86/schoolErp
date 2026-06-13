"use client";

import EditTeacherForm from "@/features/teachers/components/EditTeacherForm";

export default function EditTeacherPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Teacher</h1>
        <p className="text-muted-foreground">Update teacher information</p>
      </div>

      <EditTeacherForm />
    </div>
  );
}
