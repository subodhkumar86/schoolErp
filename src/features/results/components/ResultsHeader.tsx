"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ResultsHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">Academic Results</h1>
        <p className="text-muted-foreground">
          Track student scores, grades, and evaluation metrics
        </p>
      </div>

      <Link href="/results/create" passHref legacyBehavior>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Result
        </Button>
      </Link>
    </div>
  );
}
