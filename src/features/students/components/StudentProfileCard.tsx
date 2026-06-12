import Link from "next/link";

import { Button } from "@/components/ui/button";

import DeleteStudentDialog from "./DeleteStudentDialog";

export default function StudentProfileCard() {
  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
            RS
          </div>

          <div>
            <h2 className="text-3xl font-bold">Rahul Sharma</h2>

            <p className="mt-1 text-muted-foreground">Roll Number: STD-001</p>

            <p className="text-muted-foreground">Class: 10-A</p>

            <p className="text-muted-foreground">Email: rahul@gmail.com</p>

            <p className="text-muted-foreground">Phone: +91 9876543210</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-medium text-green-500">
            Active
          </span>

          <Link href="/students/1/edit">
            <Button>Edit Student</Button>
          </Link>

          <DeleteStudentDialog />
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border p-4">
          <p className="text-sm text-muted-foreground">Attendance</p>

          <h3 className="mt-2 text-2xl font-bold">96%</h3>
        </div>

        <div className="rounded-2xl border p-4">
          <p className="text-sm text-muted-foreground">Exams Passed</p>

          <h3 className="mt-2 text-2xl font-bold">12</h3>
        </div>

        <div className="rounded-2xl border p-4">
          <p className="text-sm text-muted-foreground">Fee Status</p>

          <h3 className="mt-2 text-2xl font-bold text-green-500">Paid</h3>
        </div>

        <div className="rounded-2xl border p-4">
          <p className="text-sm text-muted-foreground">Performance</p>

          <h3 className="mt-2 text-2xl font-bold">A+</h3>
        </div>
      </div>
    </div>
  );
}
