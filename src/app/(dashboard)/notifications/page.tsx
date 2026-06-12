import NotificationStats from "@/features/notifications/components/NotificationStats";
import NotificationList from "@/features/notifications/components/NotificationList";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Notifications</h1>

        <p className="text-muted-foreground">
          Stay updated with recent activities
        </p>
      </div>

      <NotificationStats />

      <NotificationList />
    </div>
  );
}
