"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DemoPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ schoolName: "", schoolEmail: "", plan: "Starter" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.schoolName || !form.schoolEmail) {
      toast.error("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    // Simulate setting up a new School tenant instance in the database
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSubmitting(false);

    toast.success(`${form.schoolName} sandbox instance created successfully! Redirecting...`);
    // Redirect to login where they can enter their demo credentials
    router.push("/login");
  };

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

        <form onSubmit={onSubmit} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">School / Academy Name *</label>
            <input
              type="text"
              required
              disabled={submitting}
              value={form.schoolName}
              onChange={(e) => setForm({ ...form, schoolName: e.target.value })}
              placeholder="e.g. Apex Public School"
              className="w-full rounded-2xl border border-slate-250 bg-slate-50 px-4 py-3 text-sm focus:border-blue-600 focus:bg-white focus:outline-none dark:border-slate-850 dark:bg-slate-950"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Administrator Email *</label>
            <input
              type="email"
              required
              disabled={submitting}
              value={form.schoolEmail}
              onChange={(e) => setForm({ ...form, schoolEmail: e.target.value })}
              placeholder="admin@yourschool.com"
              className="w-full rounded-2xl border border-slate-250 bg-slate-50 px-4 py-3 text-sm focus:border-blue-600 focus:bg-white focus:outline-none dark:border-slate-850 dark:bg-slate-950"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Select Trial Plan *</label>
            <select
              value={form.plan}
              disabled={submitting}
              onChange={(e) => setForm({ ...form, plan: e.target.value })}
              className="w-full rounded-2xl border border-slate-250 bg-slate-50 px-4 py-3 text-sm focus:border-blue-600 focus:bg-white focus:outline-none dark:border-slate-850 dark:bg-slate-950"
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
