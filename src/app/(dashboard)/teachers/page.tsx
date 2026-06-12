"use client";

import TeachersHeader from "@/features/teachers/components/TeachersHeader";
import TeachersStats from "@/features/teachers/components/TeachersStats";
import TeachersTable from "@/features/teachers/components/TeachersTable";

export default function TeachersPage() {
  return (
    <div className="space-y-6">
      <TeachersHeader />

      <TeachersStats />

      <TeachersTable />
    </div>
  );
}
