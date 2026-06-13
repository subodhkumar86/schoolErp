"use client";

import { useParams, useRouter } from "next/navigation";
import { useNotification } from "@/features/notifications/hooks/useNotification";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import EditNotificationForm from "@/features/notifications/components/EditNotificationForm";

export default function EditNotificationPage() {
  const params = useParams();
  const router = useRouter();
  const notificationId = params.id as string;
  const { data: notification, isLoading } = useNotification(notificationId);

  if (isLoading) return <Loader />;

  if (!notification) {
    return (
      <div className="rounded-3xl border bg-card p-6 text-center text-muted-foreground">
        Notification alert not found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(`/notifications/${notificationId}`)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Alert</h1>
          <p className="text-muted-foreground">
            Update notification details, dispatch priority, or read status
          </p>
        </div>
      </div>

      <EditNotificationForm notification={notification} />
    </div>
  );
}
