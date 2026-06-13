"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useNotification } from "@/features/notifications/hooks/useNotification";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil, Bell, Calendar, UserCheck, ShieldCheck } from "lucide-react";

export default function NotificationDetailPage() {
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/notifications")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Alert Details</h1>
            <p className="text-muted-foreground">
              View system alert tracking parameters
            </p>
          </div>
        </div>

        <Link href={`/notifications/${notificationId}/edit`} passHref legacyBehavior>
          <Button className="flex items-center gap-2">
            <Pencil className="h-4 w-4" />
            Edit Notification
          </Button>
        </Link>
      </div>

      <div className="rounded-3xl border bg-card p-8 shadow-sm space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b pb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{notification.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Notification ID: {notification._id}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-3.5 py-1 text-xs font-semibold ${
                notification.read
                  ? "bg-muted text-muted-foreground"
                  : "bg-blue-500 text-white"
              }`}
            >
              {notification.read ? "Read" : "Unread"}
            </span>
            <span
              className={`rounded-full px-3.5 py-1 text-xs font-semibold ${
                notification.type === "Success"
                  ? "bg-green-500/20 text-green-600"
                  : notification.type === "Warning"
                    ? "bg-orange-500/20 text-orange-600"
                    : notification.type === "Error"
                      ? "bg-red-500/20 text-red-600"
                      : "bg-blue-500/20 text-blue-600"
              }`}
            >
              {notification.type}
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <Bell className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Priority
              </p>
              <h4 className="font-bold text-lg mt-1">{notification.priority}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Severity flag
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-green-500/10 p-3 text-green-500">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Broadcasted On
              </p>
              <h4 className="font-bold text-lg mt-1">
                {new Date(notification.postedDate).toLocaleDateString()}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Dispatch date
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500">
              <UserCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Recipients
              </p>
              <h4 className="font-bold text-lg mt-1">
                {notification.recipient}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Audience Group
              </p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Alert Message Content
          </h3>
          <div className="rounded-2xl bg-muted/30 p-6 border text-foreground leading-relaxed whitespace-pre-wrap">
            {notification.message}
          </div>
        </div>
      </div>
    </div>
  );
}
