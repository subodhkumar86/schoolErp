"use client";

import ClassesHeader from "@/features/classes/components/ClassesHeader";
import ClassesStats from "@/features/classes/components/ClassesStats";
import ClassesTable from "@/features/classes/components/ClassesTable";

export default function ClassesPage() {
  return (
    <div className="space-y-6">
      <ClassesHeader />

      <ClassesStats />

      <ClassesTable />
    </div>
  );
}
