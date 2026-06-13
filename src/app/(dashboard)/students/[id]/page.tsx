"use client";

import StudentProfileCard from "@/features/students/components/StudentProfileCard";
import StudentAcademicInfo from "@/features/students/components/StudentAcademicInfo";
import StudentAttendanceCard from "@/features/students/components/StudentAttendanceCard";

export default function StudentDetailPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Student Profile</h1>
        <p className="text-muted-foreground">View student details</p>
      </div>

      <StudentProfileCard />

      <div className="grid gap-6 lg:grid-cols-2">
        <StudentAcademicInfo />
        <StudentAttendanceCard />
      </div>
    </div>
  );
}
