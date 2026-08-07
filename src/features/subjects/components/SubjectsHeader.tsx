"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SubjectsHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">Subject Management</h1>
        <p className="text-muted-foreground">
          Define global academic subjects, course codes, and types to assign to classes and teachers.
        </p>
      </div>

      <Button asChild className="flex items-center gap-2">
        <Link href="/subjects/create">
          <Plus className="h-4 w-4" />
          Add Subject
        </Link>
      </Button>
    </div>
  );
}
