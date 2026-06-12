"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  GraduationCap,
  ClipboardCheck,
  Activity,
  BadgeCheck,
} from "lucide-react";

import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";

import { useStudent } from "@/features/students/hooks/useStudent";
import DeleteStudentDialog from "@/features/students/components/DeleteStudentDialog";

export default function StudentDetailsPage() {
  const params = useParams();

  const { data, isLoading } = useStudent(params.id as string);

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return (
      <div className="rounded-3xl border bg-card p-6">Student not found</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="rounded-3xl border bg-card p-8 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary text-4xl font-bold text-primary-foreground">
            {data.name?.charAt(0)?.toUpperCase()}
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-bold">{data.name}</h1>

            <p className="mt-2 text-muted-foreground">
              Roll Number: {data.rollNumber}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                {data.status}
              </span>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                Class {data.studentClass}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={`/students/${data._id}/edit`}>
                <Button>Edit Student</Button>
              </Link>

              <DeleteStudentDialog studentId={data._id} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <ClipboardCheck className="h-5 w-5 text-green-500" />
            <span className="text-sm text-muted-foreground">Attendance</span>
          </div>

          <h2 className="mt-3 text-3xl font-bold">{data.attendance ?? 0}%</h2>
        </div>

        <div className="rounded-3xl border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-muted-foreground">Class</span>
          </div>

          <h2 className="mt-3 text-3xl font-bold">{data.studentClass}</h2>
        </div>

        <div className="rounded-3xl border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <BadgeCheck className="h-5 w-5 text-purple-500" />
            <span className="text-sm text-muted-foreground">Status</span>
          </div>

          <h2 className="mt-3 text-2xl font-bold">{data.status}</h2>
        </div>

        <div className="rounded-3xl border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <Activity className="h-5 w-5 text-orange-500" />
            <span className="text-sm text-muted-foreground">Performance</span>
          </div>

          <h2 className="mt-3 text-3xl font-bold">A+</h2>
        </div>
      </div>

      {/* Student Information */}
      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">Student Information</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Full Name</p>

            <p className="mt-1 font-medium">{data.name}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Roll Number</p>

            <p className="mt-1 font-medium">{data.rollNumber}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Email</p>

            <p className="mt-1 font-medium">{data.email || "-"}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Phone</p>

            <p className="mt-1 font-medium">{data.phone || "-"}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Class</p>

            <p className="mt-1 font-medium">{data.studentClass}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Section</p>

            <p className="mt-1 font-medium">{data.section || "-"}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Gender</p>

            <p className="mt-1 font-medium">{data.gender || "-"}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Attendance</p>

            <p className="mt-1 font-medium">{data.attendance ?? 0}%</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Status</p>

            <p className="mt-1 font-medium">{data.status}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Parent Name</p>

            <p className="mt-1 font-medium">{data.parentName || "-"}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Parent Phone</p>

            <p className="mt-1 font-medium">{data.parentPhone || "-"}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Student ID</p>

            <p className="mt-1 font-medium">{data._id}</p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-muted-foreground">Address</p>

            <p className="mt-1 font-medium">{data.address || "-"}</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>

        <div className="space-y-3">
          <div className="rounded-xl border p-4">
            Student attendance updated.
          </div>

          <div className="rounded-xl border p-4">
            Profile information verified.
          </div>

          <div className="rounded-xl border p-4">
            Academic performance reviewed.
          </div>
        </div>
      </div>
    </div>
  );
}
