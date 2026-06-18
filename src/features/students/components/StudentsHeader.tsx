"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateStudentDialog from "./CreateStudentDialog";

export default function StudentsHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">Students</h1>

        <p className="text-muted-foreground">Manage all students</p>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/students/promote" passHref legacyBehavior>
          <Button variant="outline" className="flex items-center gap-2 rounded-xl border-slate-200">
            <ArrowUpRight className="h-4 w-4" />
            Class Promotion
          </Button>
        </Link>
        <CreateStudentDialog />
      </div>
    </div>
  );
}
