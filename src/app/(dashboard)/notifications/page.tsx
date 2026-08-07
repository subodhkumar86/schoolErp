import NotificationStats from "@/features/notifications/components/NotificationStats";
import NotificationTable from "@/features/notifications/components/NotificationTable";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Alerts & Notifications</h1>
          <p className="text-muted-foreground">
            Manage alerts and notifications sent to teachers, students, or system administrators
          </p>
        </div>

        <Button asChild className="flex items-center gap-2">
          <Link href="/notifications/create">
            <Plus className="h-4 w-4" />
            Compose Notification
          </Link>
        </Button>
      </div>

      <NotificationStats />

      <NotificationTable />
    </div>
  );
}
