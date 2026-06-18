"use client";

import { useParams } from "next/navigation";
import { useStudent } from "../hooks/useStudent";
import Loader from "@/components/shared/Loader";

export default function StudentAcademicInfo() {
  const params = useParams();
  const studentId = params.id as string;
  const { data: student, isLoading } = useStudent(studentId);

  if (isLoading) return <Loader />;
  if (!student) return null;

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-semibold">Academic Information</h3>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-muted-foreground block">Current Class</span>
          <span className="font-semibold text-foreground">{student.studentClass || "—"}</span>
        </div>
        <div>
          <span className="text-muted-foreground block">Section</span>
          <span className="font-semibold text-foreground">{student.section || "A"}</span>
        </div>
        <div>
          <span className="text-muted-foreground block">Enrollment Status</span>
          <span
            className={`inline-block mt-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
              student.status === "Active"
                ? "bg-green-500/10 text-green-600"
                : "bg-red-500/10 text-red-600"
            }`}
          >
            {student.status || "Active"}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground block">Admission Date</span>
          <span className="font-semibold text-foreground">
            {student.admissionDate
              ? new Date(student.admissionDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "—"}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground block">Guardian Name</span>
          <span className="font-semibold text-foreground">{student.parentName || "—"}</span>
        </div>
        <div>
          <span className="text-muted-foreground block">Residential Address</span>
          <span className="font-semibold text-foreground">{student.address || "—"}</span>
        </div>
      </div>
    </div>
  );
}
