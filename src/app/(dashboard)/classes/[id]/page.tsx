"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useClass } from "@/features/classes/hooks/useClass";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Pencil,
  BookOpen,
  User,
  Users,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function ClassDetailPage() {
  const params = useParams();
  const router = useRouter();
  const classId = params.id as string;
  const { data: cls, isLoading } = useClass(classId);

  if (isLoading) return <Loader />;

  if (!cls) {
    return (
      <div className="rounded-3xl border bg-card p-6 text-center text-muted-foreground">
        Class not found
      </div>
    );
  }

  const teacher =
    typeof cls.classTeacher === "object" ? cls.classTeacher : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/classes")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Class Details</h1>
            <p className="text-muted-foreground">
              Detailed overview of the class
            </p>
          </div>
        </div>

        <Link href={`/classes/${classId}/edit`} passHref legacyBehavior>
          <Button className="flex items-center gap-2">
            <Pencil className="h-4 w-4" />
            Edit Class
          </Button>
        </Link>
      </div>

      <div className="rounded-3xl border bg-card p-8 shadow-sm space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b pb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {cls.name} - {cls.section}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Class ID: {cls._id}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {cls.status === "Active" ? (
              <span className="flex items-center gap-1.5 rounded-full bg-green-500/20 px-3.5 py-1 text-xs font-semibold text-green-600">
                <CheckCircle className="h-3.5 w-3.5" />
                Active
              </span>
            ) : (
              <span className="flex items-center gap-1.5 rounded-full bg-red-500/20 px-3.5 py-1 text-xs font-semibold text-red-600">
                <AlertCircle className="h-3.5 w-3.5" />
                Inactive
              </span>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <User className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Class Teacher
              </p>
              <h4 className="font-bold text-lg mt-1">
                {teacher?.name ?? "No teacher assigned"}
              </h4>
              {teacher?.employeeId && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  ID: {teacher.employeeId}
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Capacity
              </p>
              <h4 className="font-bold text-lg mt-1">
                {cls.capacity} Students
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Maximum recommended size
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-purple-500/10 p-3 text-purple-500">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Subjects
              </p>
              <h4 className="font-bold text-lg mt-1">
                {cls.subjects?.length ?? 0} Subjects
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Assigned to curriculum
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-bold border-b pb-2">
            Assigned Curriculum Subjects
          </h3>
          {cls.subjects && cls.subjects.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {cls.subjects.map((subject, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-xl border bg-muted/20 p-4"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background text-sm font-semibold text-muted-foreground border">
                    {idx + 1}
                  </div>
                  <span className="font-medium">{subject}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No subjects assigned to this class yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
