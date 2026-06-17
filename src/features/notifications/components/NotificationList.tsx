"use client";

import { useNotifications } from "../hooks/useNotifications";
import Loader from "@/components/shared/Loader";

export default function NotificationList() {
  const { data: response, isLoading } = useNotifications({ limit: 5 });
  const list = response?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex justify-center p-6">
        <Loader />
      </div>
    );
  }

  return (
    <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-800 dark:text-slate-100">
        Recent Notifications
      </h2>

      {list.length === 0 ? (
        <p className="text-sm text-slate-450 dark:text-slate-500 py-4 text-center">
          No notifications found.
        </p>
      ) : (
        <div className="space-y-4">
          {list.map((notification) => (
            <div
              key={notification._id}
              className="rounded-2xl border border-slate-100 dark:border-slate-900 p-4 bg-slate-50/20 dark:bg-slate-900/10 hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-all duration-200"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold text-slate-850 dark:text-slate-200">
                  {notification.title}
                </h3>
                <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {notification.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
