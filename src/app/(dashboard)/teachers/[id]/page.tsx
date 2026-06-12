"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  GraduationCap,
  BadgeCheck,
  Briefcase,
  IndianRupee,
} from "lucide-react";

import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";

import { useTeacher } from "@/features/teachers/hooks/useTeacher";
import DeleteTeacherDialog from "@/features/teachers/components/DeleteTeacherDialog";

export default function TeacherDetailsPage() {
  const params = useParams();

  const { data, isLoading } = useTeacher(params.id as string);

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return (
      <div className="rounded-3xl border bg-card p-6">Teacher not found</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border bg-card p-8 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary text-4xl font-bold text-primary-foreground">
            {data.name?.charAt(0)?.toUpperCase()}
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-bold">{data.name}</h1>

            <p className="mt-2 text-muted-foreground">
              Employee ID: {data.employeeId}
            </p>

            <div className="mt-4 flex gap-2">
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                {data.status}
              </span>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                {data.department}
              </span>
            </div>

            <div className="mt-5 flex gap-3">
              <Link href={`/teachers/${data._id}/edit`}>
                <Button>Edit Teacher</Button>
              </Link>

              <DeleteTeacherDialog teacherId={data._id} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border bg-card p-5 shadow-sm">
          <Briefcase className="mb-3 h-5 w-5 text-blue-500" />

          <h2 className="text-3xl font-bold">{data.experience || 0}</h2>

          <p className="text-muted-foreground">Experience</p>
        </div>

        <div className="rounded-3xl border bg-card p-5 shadow-sm">
          <GraduationCap className="mb-3 h-5 w-5 text-green-500" />

          <h2 className="text-xl font-bold">{data.qualification || "-"}</h2>

          <p className="text-muted-foreground">Qualification</p>
        </div>

        <div className="rounded-3xl border bg-card p-5 shadow-sm">
          <IndianRupee className="mb-3 h-5 w-5 text-purple-500" />

          <h2 className="text-3xl font-bold">₹{data.salary || 0}</h2>

          <p className="text-muted-foreground">Salary</p>
        </div>

        <div className="rounded-3xl border bg-card p-5 shadow-sm">
          <BadgeCheck className="mb-3 h-5 w-5 text-orange-500" />

          <h2 className="text-xl font-bold">{data.status}</h2>

          <p className="text-muted-foreground">Status</p>
        </div>
      </div>

      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">Teacher Information</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Info label="Name" value={data.name} />
          <Info label="Email" value={data.email} />
          <Info label="Phone" value={data.phone} />
          <Info label="Employee ID" value={data.employeeId} />
          <Info label="Department" value={data.department} />
          <Info label="Qualification" value={data.qualification} />
          <Info label="Experience" value={`${data.experience || 0} Years`} />
          <Info label="Salary" value={`₹${data.salary || 0}`} />

          <div className="md:col-span-2">
            <p className="text-sm text-muted-foreground">Address</p>

            <p className="mt-1 font-medium">{data.address || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string | number }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="mt-1 font-medium">{value || "-"}</p>
    </div>
  );
}
