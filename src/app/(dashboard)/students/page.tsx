"use client";

import StudentsHeader from "@/features/students/components/StudentsHeader";
import StudentsStats from "@/features/students/components/StudentsStats";
import StudentsTable from "@/features/students/components/StudentsTable";

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <StudentsHeader />

      <StudentsStats />

      <StudentsTable />
    </div>
  );
}
