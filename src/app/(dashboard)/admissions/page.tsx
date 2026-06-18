"use client";

import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdmissionsTable from "@/features/admissions/components/AdmissionsTable";

export default function AdmissionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admissions</h1>
          <p className="text-muted-foreground">Manage and process student applications</p>
        </div>

        <Link href="/admissions/create" passHref legacyBehavior>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Application
          </Button>
        </Link>
      </div>

      <AdmissionsTable />
    </div>
  );
}
