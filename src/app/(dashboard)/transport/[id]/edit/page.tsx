"use client";

import { useParams, useRouter } from "next/navigation";
import { useTransport } from "@/features/transport/hooks/useTransport";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import EditTransportForm from "@/features/transport/components/EditTransportForm";

export default function EditRoutePage() {
  const params = useParams();
  const router = useRouter();
  const routeId = params.id as string;
  const { data: route, isLoading } = useTransport(routeId);

  if (isLoading) return <Loader />;

  if (!route) {
    return (
      <div className="rounded-3xl border bg-card p-6 text-center text-muted-foreground">
        Transport route not found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(`/transport/${routeId}`)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Route</h1>
          <p className="text-muted-foreground">
            Update vehicle details, driver logs, or capacity settings
          </p>
        </div>
      </div>

      <EditTransportForm route={route} />
    </div>
  );
}
