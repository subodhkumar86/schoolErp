"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InventoryHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">School Asset Inventory</h1>
        <p className="text-muted-foreground">
          Track school physical assets, electronic components, furniture, and location status
        </p>
      </div>

      <Link href="/inventory/create" passHref legacyBehavior>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Asset
        </Button>
      </Link>
    </div>
  );
}
