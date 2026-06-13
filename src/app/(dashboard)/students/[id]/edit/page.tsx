"use client";

import EditStudentForm from "@/features/students/components/EditStudentForm";

export default function EditStudentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Student</h1>
        <p className="text-muted-foreground">Update student information</p>
      </div>

      <EditStudentForm />
    </div>
  );
}
