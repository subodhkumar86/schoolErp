"use client";

import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import Loader from "@/components/shared/Loader";


export default function ActivityTimeline() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) return <Loader />;

  const notices = stats?.recentNotices || [];

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-bold">Recent Notices</h3>

      <div className="space-y-5">
        {notices.length === 0 ? (
          <p className="text-xs text-muted-foreground">No recent announcements found</p>
        ) : (
          notices.map((notice, index) => {
            const colors = [
              "bg-blue-500",
              "bg-green-500",
              "bg-purple-500",
              "bg-orange-500",
              "bg-teal-500"
            ];
            const dotCol = colors[index % colors.length];

            return (
              <div key={notice._id} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
                <div className={`mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full ${dotCol}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-foreground truncate max-w-[200px]">
                      {notice.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {new Date(notice.postedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                    {notice.content}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
