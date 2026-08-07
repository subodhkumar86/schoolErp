"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Loader2, CheckCircle2, ArrowRight, ShieldCheck, Key } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DemoPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ schoolName: "", schoolEmail: "", plan: "Starter" });
  const [registeredData, setRegisteredData] = useState<{
    schoolName: string;
    adminUsername: string;
    adminEmail: string;
    plan: string;
  } | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.schoolName || !form.schoolEmail) {
      toast.error("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    try {
      // Auto-generate admin username based on school name slug
      const slug = form.schoolName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .slice(0, 10);
      const generatedUsername = `admin-${slug || "sandbox"}`;
      const defaultPassword = "password123";

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schoolName: form.schoolName,
          adminEmail: form.schoolEmail,
          adminUsername: generatedUsername,
          adminPassword: defaultPassword,
          plan: form.plan,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to initialize demo instance.");
      }

      setRegisteredData({
        schoolName: form.schoolName,
        adminUsername: generatedUsername,
        adminEmail: form.schoolEmail,
        plan: form.plan,
      });
      toast.success("Sandbox database provisioned successfully!");
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "An error occurred during provisioning.");
    } finally {
      setSubmitting(false);
    }
  };

  if (registeredData) {
    return (
      <div className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="container mx-auto px-6 max-w-2xl text-center space-y-8 animate-fade-in">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 shadow-md">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black sm:text-4xl bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Demo Instance Created!
            </h1>
            <p className="text-slate-655 dark:text-slate-400 max-w-md mx-auto">
              Your isolated multi-tenant database is provisioned and ready for testing.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900 text-left space-y-6">
            <h3 className="font-bold text-lg border-b pb-3 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              Administrative Credentials
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 text-sm">
              <div>
                <span className="text-muted-foreground block text-xs uppercase tracking-wider">School Tenant</span>
                <span className="font-bold text-foreground">{registeredData.schoolName}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs uppercase tracking-wider">Subscription Plan</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{registeredData.plan} Trial</span>
              </div>
              <div className="sm:col-span-2 border-t pt-4">
                <span className="text-muted-foreground block text-xs uppercase tracking-wider mb-1">Generated Admin Username</span>
                <code className="bg-slate-100 dark:bg-slate-950 px-2.5 py-1 rounded-lg text-xs font-semibold text-foreground">
                  {registeredData.adminUsername}
                </code>
              </div>
              <div className="sm:col-span-2">
                <span className="text-muted-foreground block text-xs uppercase tracking-wider">Admin Email</span>
                <span className="font-medium text-foreground">{registeredData.adminEmail}</span>
              </div>
              <div className="sm:col-span-2 border-t pt-4 flex items-center justify-between">
                <div>
                  <span className="text-muted-foreground block text-xs uppercase tracking-wider mb-1">Temporary Password</span>
                  <code className="bg-slate-100 dark:bg-slate-950 px-2.5 py-1 rounded-lg text-xs font-semibold text-foreground">
                    password123
                  </code>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold bg-amber-500/10 px-3 py-1 rounded-full">
                  <Key className="h-3.5 w-3.5" />
                  Change after login
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                router.push(
                  `/login?username=${encodeURIComponent(
                    registeredData.adminUsername
                  )}&password=password123`
                )
              }
              className="w-full rounded-2xl bg-blue-600 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Access Login Portal
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-6 max-w-xl space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black sm:text-5xl bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            Request Demo Instance
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Spin up a brand new, fully isolated sandbox school instance with your chosen subscription plan in seconds.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900 space-y-6"
        >
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              School / Academy Name *
            </label>
            <input
              type="text"
              required
              disabled={submitting}
              value={form.schoolName}
              onChange={(e) => setForm({ ...form, schoolName: e.target.value })}
              placeholder="e.g. Apex Public School"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:border-blue-600 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Administrator Email *
            </label>
            <input
              type="email"
              required
              disabled={submitting}
              value={form.schoolEmail}
              onChange={(e) => setForm({ ...form, schoolEmail: e.target.value })}
              placeholder="admin@yourschool.com"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:border-blue-600 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Select Trial Plan *
            </label>
            <select
              value={form.plan}
              disabled={submitting}
              onChange={(e) => setForm({ ...form, plan: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:border-blue-600 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 transition-colors"
            >
              <option value="Starter">Starter Plan (Up to 100 students)</option>
              <option value="Professional">Professional Plan (Up to 500 students)</option>
              <option value="Enterprise">Enterprise Plan (Unlimited)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-2xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Initializing School Tenant...
              </>
            ) : (
              "Initialize Sandbox ERP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
