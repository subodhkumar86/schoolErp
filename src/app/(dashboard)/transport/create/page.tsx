"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateTransportForm from "@/features/transport/components/CreateTransportForm";

export default function CreateTransportPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/transport")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add Transport Route</h1>
          <p className="text-muted-foreground">
            Register a new route network path and vehicle capacity
          </p>
        </div>
      </div>

      <CreateTransportForm />
    </div>
  );
}
