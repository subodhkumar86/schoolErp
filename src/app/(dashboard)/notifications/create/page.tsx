"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateNotificationForm from "@/features/notifications/components/CreateNotificationForm";

export default function CreateNotificationPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/notifications")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Compose Alert</h1>
          <p className="text-muted-foreground">
            Publish a new system alert notification to students or teachers
          </p>
        </div>
      </div>

      <CreateNotificationForm />
    </div>
  );
}
