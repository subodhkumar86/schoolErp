"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateInventoryForm from "@/features/inventory/components/CreateInventoryForm";

export default function CreateInventoryPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/inventory")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add Asset</h1>
          <p className="text-muted-foreground">
            Record a new physical asset or school equipment item
          </p>
        </div>
      </div>

      <CreateInventoryForm />
    </div>
  );
}
