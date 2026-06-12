import { notifications } from "../mock/notifications";

export default function NotificationList() {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <h2 className="mb-6 text-xl font-semibold">Recent Notifications</h2>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{notification.title}</h3>

              <span className="text-xs text-muted-foreground">
                {notification.time}
              </span>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              {notification.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
