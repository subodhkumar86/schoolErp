"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordForm() {
  return (
    <div className="w-full max-w-md rounded-3xl border bg-card p-8 shadow-lg space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        <p className="text-muted-foreground">Reset instructions</p>
      </div>

      <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5 text-amber-600 dark:text-amber-500 text-sm leading-relaxed">
        <span className="font-semibold block mb-1">🔑 Admin-Initiated Reset Only</span>
        For security reasons, password resets must be initiated by a school administrator. Please contact the administration office or your supervisor to request a password reset.
      </div>

      <div className="space-y-4">
        <Link href="/login" passHref legacyBehavior>
          <Button variant="outline" className="w-full">
            Back to Login
          </Button>
        </Link>
      </div>
    </div>
  );
}
