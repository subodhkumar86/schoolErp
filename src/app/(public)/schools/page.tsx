import React from "react";
import Link from "next/link";
import { Building2, ShieldAlert, Sparkles, Receipt, Users, BarChart3 } from "lucide-react";

export default function SchoolsMarketingPage() {
  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-6 max-w-5xl space-y-16">
        {/* Hero Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            <Building2 className="h-3 w-3" /> Built for Modern Schools
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            EduFlow for <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Educational Institutions</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Transform your academy, college, or coaching institute with secure multi-tenant data boundaries, automated fee processing, and comprehensive administrative controls.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border bg-card p-6 shadow-md hover:shadow-lg transition-all border-slate-200 dark:border-slate-800 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">100% Tenant Isolation</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Your database is isolated using strict tenant boundaries (`schoolId`). No chance of cross-school data leakage.
            </p>
          </div>

          <div className="rounded-3xl border bg-card p-6 shadow-md hover:shadow-lg transition-all border-slate-200 dark:border-slate-800 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Receipt className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Automated Fee Collection</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Generate custom structured invoices, handle payment tracking automatically, and log receipts for quick accountant reconciliations.
            </p>
          </div>

          <div className="rounded-3xl border bg-card p-6 shadow-md hover:shadow-lg transition-all border-slate-200 dark:border-slate-800 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-purple-100 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Advanced Analytics</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Track student admissions, dynamic attendance percentages, and monthly fee collections via an integrated interactive dashboard.
            </p>
          </div>
        </div>

        {/* Detailed Section */}
        <div className="rounded-3xl bg-slate-100 dark:bg-slate-900/50 p-8 md:p-12 border border-slate-200/50 dark:border-slate-800/50 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              Complete Admin Control in One Place
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              EduFlow equips your administration with a comprehensive suite of tools. Manage student enrollment, handle library assets with fine calculations, track physical inventory, and publish notifications to teachers, students, and parents instantly.
            </p>
            <div className="flex gap-4">
              <Link
                href="/demo"
                className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-all"
              >
                Schedule Institution Demo
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-950 border">
              <Sparkles className="h-5 w-5 text-amber-500 mt-1" />
              <div>
                <h4 className="font-bold text-sm">Flexible Custom Subdomains</h4>
                <p className="text-xs text-muted-foreground mt-1">Configure custom branding and sub-routes mapped precisely to your school&apos;s domain name.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-950 border">
              <Users className="h-5 w-5 text-indigo-500 mt-1" />
              <div>
                <h4 className="font-bold text-sm">Multi-Role Support</h4>
                <p className="text-xs text-muted-foreground mt-1">Ready-made portals for Admins, Teachers, Students, Parents, Librarians, and Accountants.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
