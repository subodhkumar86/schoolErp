export default function NotificationStats() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl bg-blue-600 p-6 text-white">
        <p>Total Notifications</p>
        <h2 className="text-3xl font-bold">128</h2>
      </div>

      <div className="rounded-2xl bg-green-600 p-6 text-white">
        <p>Unread</p>
        <h2 className="text-3xl font-bold">12</h2>
      </div>

      <div className="rounded-2xl bg-orange-500 p-6 text-white">
        <p>Important</p>
        <h2 className="text-3xl font-bold">5</h2>
      </div>
    </div>
  );
}
