"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TransportHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">Transport Fleet & Routes</h1>
        <p className="text-muted-foreground">
          Monitor route networks, assign active driver details, and trace vehicle capacities
        </p>
      </div>

      <Link href="/transport/create" passHref legacyBehavior>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Route
        </Button>
      </Link>
    </div>
  );
}
