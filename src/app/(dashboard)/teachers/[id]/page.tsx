"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useTeacher } from "@/features/teachers/hooks/useTeacher";
import DeleteTeacherDialog from "@/features/teachers/components/DeleteTeacherDialog";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export default function TeacherDetailPage() {
  const params = useParams();
  const teacherId = params.id as string;
  const { data: teacher, isLoading } = useTeacher(teacherId);

  if (isLoading) return <Loader />;

  if (!teacher) {
    return (
      <div className="rounded-3xl border bg-card p-6">Teacher not found</div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Teacher Profile</h1>
        <p className="text-muted-foreground">View teacher details</p>
      </div>

      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
              {teacher.name
                ?.split(" ")
                .map((n: string) => n[0])
                .join("")
                .slice(0, 2)}
            </div>

            <div>
              <h2 className="text-2xl font-bold">{teacher.name}</h2>
              <p className="mt-1 text-muted-foreground">
                Employee ID: {teacher.employeeId}
              </p>
              <p className="text-muted-foreground">
                Department: {teacher.department}
              </p>
              {teacher.email && (
                <p className="text-muted-foreground">Email: {teacher.email}</p>
              )}
              {teacher.phone && (
                <p className="text-muted-foreground">Phone: {teacher.phone}</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                teacher.status === "Active"
                  ? "bg-green-500/20 text-green-500"
                  : teacher.status === "On Leave"
                    ? "bg-yellow-500/20 text-yellow-500"
                    : "bg-red-500/20 text-red-500"
              }`}
            >
              {teacher.status}
            </span>

            <Link href={`/teachers/${teacherId}/edit`}>
              <Button>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Teacher
              </Button>
            </Link>

            <DeleteTeacherDialog teacherId={teacherId} />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border p-4">
            <p className="text-sm text-muted-foreground">Experience</p>
            <h3 className="mt-2 text-2xl font-bold">
              {teacher.experience ?? 0} yrs
            </h3>
          </div>

          <div className="rounded-2xl border p-4">
            <p className="text-sm text-muted-foreground">Qualification</p>
            <h3 className="mt-2 text-xl font-bold">
              {teacher.qualification || "—"}
            </h3>
          </div>

          <div className="rounded-2xl border p-4">
            <p className="text-sm text-muted-foreground">Salary</p>
            <h3 className="mt-2 text-2xl font-bold">
              ₹{(teacher.salary ?? 0).toLocaleString()}
            </h3>
          </div>

          <div className="rounded-2xl border p-4">
            <p className="text-sm text-muted-foreground">Subjects</p>
            <h3 className="mt-2 text-xl font-bold">
              {teacher.subjects?.length ?? 0}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
