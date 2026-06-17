import React from "react";
import Link from "next/link";
import { BookOpen, Award, CheckSquare, Sparkles, Megaphone, FileText } from "lucide-react";

export default function StudentsMarketingPage() {
  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-6 max-w-5xl space-y-16">
        {/* Hero Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
            <BookOpen className="h-3 w-3 text-indigo-600" /> Student Portal
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Learn Smarter with <span className="bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">EduFlow ERP</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Access your homework schedules, look up library catalog details, track notices, and review midterm exam scores in one modern interface.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border bg-card p-6 shadow-md hover:shadow-lg transition-all border-slate-200 dark:border-slate-800 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <CheckSquare className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Homework Checklist</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Track assigned math problems, chemistry projects, and physics calculations. Never miss a submission deadline.
            </p>
          </div>

          <div className="rounded-3xl border bg-card p-6 shadow-md hover:shadow-lg transition-all border-slate-200 dark:border-slate-800 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Exam Results Table</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              View graded test papers, subject marks, class ranks, and track progress over the academic semester.
            </p>
          </div>

          <div className="rounded-3xl border bg-card p-6 shadow-md hover:shadow-lg transition-all border-slate-200 dark:border-slate-800 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-purple-100 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Megaphone className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Instant Notices</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Stay in the loop with dynamic notice board feeds, sports meets updates, and extracurricular activities.
            </p>
          </div>
        </div>

        {/* Detailed Section */}
        <div className="rounded-3xl bg-slate-100 dark:bg-slate-900/50 p-8 md:p-12 border border-slate-200/50 dark:border-slate-800/50 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              All Academic Materials, Instantly Accessible
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              The Student Dashboard lets you review your attendance charts (keep that average above 75%!), search the library for science text references, review teacher notifications, and view exam calendars dynamically.
            </p>
            <div className="flex gap-4">
              <Link
                href="/login"
                className="rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 transition-all"
              >
                Log In to Portal
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-950 border">
              <FileText className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <h4 className="font-bold text-sm">Downloadable Study Guides</h4>
                <p className="text-xs text-muted-foreground mt-1">Get class lecture notes and syllabus details in PDF format direct from teachers.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-950 border">
              <Sparkles className="h-5 w-5 text-amber-500 mt-1" />
              <div>
                <h4 className="font-bold text-sm">Modern Interactive UI</h4>
                <p className="text-xs text-muted-foreground mt-1">An interface that works flawlessly across dynamic mobile browsers, tablets, and desktop monitors.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
