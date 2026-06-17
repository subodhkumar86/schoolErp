import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart, Sparkles, CreditCard, Bell, BarChart2 } from "lucide-react";

export default function ParentsMarketingPage() {
  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-6 max-w-5xl space-y-16">
        {/* Hero Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
            <Heart className="h-3 w-3 text-rose-600" /> Parent Portal Integration
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Peace of Mind for <span className="bg-gradient-to-r from-rose-500 to-indigo-500 bg-clip-text text-transparent">Every Parent</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            EduFlow links parents directly with their children&apos;s school lifecycle. Securely track academic progress, review fee due dates, and monitor daily attendance.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border bg-card p-6 shadow-md hover:shadow-lg transition-all border-slate-200 dark:border-slate-800 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <BarChart2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Academic Tracking</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Instantly view midterm exam grades, GPA calculations, teacher comments, and performance history charts.
            </p>
          </div>

          <div className="rounded-3xl border bg-card p-6 shadow-md hover:shadow-lg transition-all border-slate-200 dark:border-slate-800 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <CreditCard className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Simple Fee Payments</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Check due balances, inspect itemized invoices, and launch payment portals for fast and secure processing.
            </p>
          </div>

          <div className="rounded-3xl border bg-card p-6 shadow-md hover:shadow-lg transition-all border-slate-200 dark:border-slate-800 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Bell className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Real-time Notices</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Get notified immediately on upcoming school events, sudden weather holidays, or parent-teacher meets.
            </p>
          </div>
        </div>

        {/* Detailed Section */}
        <div className="rounded-3xl bg-slate-100 dark:bg-slate-900/50 p-8 md:p-12 border border-slate-200/50 dark:border-slate-800/50 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              Never Miss an Important Update
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              The Parent Dashboard offers a curated overview. If you have multiple children enrolled in the same school, toggle between profiles with a single click. Keep track of attendance rates, download report cards, and check pending homework statuses at any time.
            </p>
            <div className="flex gap-4">
              <Link
                href="/login"
                className="rounded-2xl bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-rose-700 transition-all"
              >
                Access Parent Portal
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-950 border">
              <ShieldCheck className="h-5 w-5 text-emerald-500 mt-1" />
              <div>
                <h4 className="font-bold text-sm">Secure Profile Protection</h4>
                <p className="text-xs text-muted-foreground mt-1">Parent credentials are encrypted and verified to guarantee child safety and absolute profile privacy.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-950 border">
              <Sparkles className="h-5 w-5 text-amber-500 mt-1" />
              <div>
                <h4 className="font-bold text-sm">Automated Payment Receipts</h4>
                <p className="text-xs text-muted-foreground mt-1">Download official PDF receipts instantly upon online fee clearance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
