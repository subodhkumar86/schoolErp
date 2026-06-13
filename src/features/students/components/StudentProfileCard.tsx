"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useStudent } from "../hooks/useStudent";
import DeleteStudentDialog from "./DeleteStudentDialog";
import Loader from "@/components/shared/Loader";

export default function StudentProfileCard() {
  const params = useParams();
  const router = useRouter();
  const studentId = params.id as string;
  const { data: student, isLoading } = useStudent(studentId);
  const [showDelete, setShowDelete] = useState(false);

  if (isLoading) return <Loader />;

  if (!student) {
    return (
      <div className="rounded-3xl border bg-card p-6">Student not found</div>
    );
  }

  const initials = (student.name as string)
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
            {initials}
          </div>

          <div>
            <h2 className="text-3xl font-bold">{student.name as string}</h2>

            <p className="mt-1 text-muted-foreground">
              Roll Number: {student.rollNumber as string}
            </p>

            <p className="text-muted-foreground">
              Class: {student.studentClass as string}
              {student.section ? `-${student.section as string}` : ""}
            </p>

            {student.email && (
              <p className="text-muted-foreground">
                Email: {student.email as string}
              </p>
            )}

            {student.phone && (
              <p className="text-muted-foreground">
                Phone: {student.phone as string}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              student.status === "Active"
                ? "bg-green-500/20 text-green-500"
                : "bg-red-500/20 text-red-500"
            }`}
          >
            {student.status as string}
          </span>

          <Link href={`/students/${studentId}/edit`}>
            <Button>Edit Student</Button>
          </Link>

          <Button variant="destructive" onClick={() => setShowDelete(true)}>
            Delete Student
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border p-4">
          <p className="text-sm text-muted-foreground">Attendance</p>
          <h3 className="mt-2 text-2xl font-bold">
            {(student.attendance as number) ?? 100}%
          </h3>
        </div>

        <div className="rounded-2xl border p-4">
          <p className="text-sm text-muted-foreground">Gender</p>
          <h3 className="mt-2 text-xl font-bold">
            {(student.gender as string) || "—"}
          </h3>
        </div>

        <div className="rounded-2xl border p-4">
          <p className="text-sm text-muted-foreground">Parent</p>
          <h3 className="mt-2 text-xl font-bold">
            {(student.parentName as string) || "—"}
          </h3>
        </div>

        <div className="rounded-2xl border p-4">
          <p className="text-sm text-muted-foreground">Parent Phone</p>
          <h3 className="mt-2 text-xl font-bold">
            {(student.parentPhone as string) || "—"}
          </h3>
        </div>
      </div>

      {showDelete && (
        <DeleteStudentDialog
          studentId={studentId}
          onClose={() => {
            setShowDelete(false);
            router.push("/students");
          }}
        />
      )}
    </div>
  );
}
