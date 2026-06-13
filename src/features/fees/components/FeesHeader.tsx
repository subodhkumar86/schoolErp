"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FeesHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">Fee Management</h1>
        <p className="text-muted-foreground">
          Track school fee payments, issue billing invoices, and view receipts
        </p>
      </div>

      <Link href="/fees/create" passHref legacyBehavior>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Record Payment
        </Button>
      </Link>
    </div>
  );
}
