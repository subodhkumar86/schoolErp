"use client";

import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/shared/Loader";
import { Shield, User, Clock } from "lucide-react";

interface AuditLog {
  _id: string;
  action: string;
  details: string;
  createdAt: string;
  userId?: {
    username: string;
    email: string;
    role: string;
  };
}

export default function AuditLogsPanel() {
  const { data: logs, isLoading, error, refetch } = useQuery<AuditLog[]>({
    queryKey: ["auditLogs"],
    queryFn: async () => {
      const res = await fetch("/api/settings/logs");
      if (!res.ok) throw new Error("Failed to fetch logs");
      return res.json();
    },
  });

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Shield className="h-5 w-5 text-indigo-600" />
            Audit Trail & System Logs
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Real-time administrative operations and audit changes across your tenant
          </p>
        </div>

        <button
          onClick={() => refetch()}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border bg-background hover:bg-slate-50 transition-colors"
        >
          Refresh Feed
        </button>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <p className="text-sm text-red-500">Failed to load system activity logs.</p>
      ) : !logs || logs.length === 0 ? (
        <p className="text-sm text-muted-foreground">No recent administrative logs registered.</p>
      ) : (
        <div className="max-h-96 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
          {logs.map((log) => {
            const timeStr = new Date(log.createdAt).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={log._id}
                className="flex items-start gap-4 p-4 rounded-2xl border bg-slate-50/50 dark:bg-slate-900/30 hover:bg-slate-55/60 dark:hover:bg-slate-900/50 transition-colors duration-150"
              >
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 mt-1">
                  <User className="h-4 w-4" />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-bold text-foreground">
                      {log.action}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {timeStr}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {log.details}
                  </p>

                  {log.userId && (
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-350 px-2 py-0.5 rounded-md font-medium">
                        User: {log.userId.username} ({log.userId.role})
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {log.userId.email}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
