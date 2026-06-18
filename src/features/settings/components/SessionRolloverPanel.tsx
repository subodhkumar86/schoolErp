"use client";

import React, { useState } from "react";
import { useSettings } from "../hooks/useSettings";
import { toast } from "sonner";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CalendarRange } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export default function SessionRolloverPanel() {
  const queryClient = useQueryClient();
  const { data: settings, isLoading } = useSettings();

  const [nextSession, setNextSession] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [isRollingOver, setIsRollingOver] = useState(false);

  if (isLoading) return <Loader />;

  const currentSession = settings?.sessionYear || "2026-2027";

  const handleRollover = async () => {
    if (!nextSession) {
      toast.error("Please specify the next session year");
      return;
    }

    setIsRollingOver(true);
    try {
      const res = await fetch("/api/settings/rollover", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nextSession }),
      });

      if (!res.ok) {
        throw new Error("Failed to roll over session");
      }

      toast.success(`Academic session successfully rolled over to ${nextSession}`);
      setShowConfirm(false);
      setNextSession("");
      
      // Invalidate settings query to reload the current state
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard-stats"],
      });
    } catch {
      toast.error("Failed to roll over academic session");
    } finally {
      setIsRollingOver(false);
    }
  };

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
          <CalendarRange className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Academic Session Rollover</h2>
          <p className="text-sm text-muted-foreground">
            Advance the school&apos;s global calendar settings to the next academic cycle
          </p>
        </div>
      </div>

      <div className="space-y-4 max-w-xl">
        <div className="rounded-2xl bg-amber-500/5 border border-amber-500/10 p-4 text-sm text-amber-700 dark:text-amber-400">
          <strong>Notice:</strong> Session rollover will update the active school catalog parameters. It is highly recommended to promote/retain students in the current batch before advancing the session year.
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Current Session</Label>
            <Input value={currentSession} disabled className="mt-2 bg-slate-50 dark:bg-slate-900" />
          </div>

          <div>
            <Label htmlFor="nextSession">Next Session Year</Label>
            <Input
              id="nextSession"
              placeholder="e.g. 2027-2028"
              value={nextSession}
              onChange={(e) => setNextSession(e.target.value)}
              className="mt-2"
            />
          </div>
        </div>

        <Button
          type="button"
          onClick={() => setShowConfirm(true)}
          disabled={!nextSession}
          className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl"
        >
          Begin Session Rollover
        </Button>
      </div>

      <Dialog open={showConfirm} onOpenChange={() => setShowConfirm(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Academic Session Rollover</DialogTitle>
            <DialogDescription>
              Are you sure you want to rollover the academic year to **{nextSession}**? This will change the primary active academic calendar for all modules.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setShowConfirm(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button
              onClick={handleRollover}
              disabled={isRollingOver}
              className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl"
            >
              {isRollingOver ? "Rolling Over..." : "Confirm Rollover"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
