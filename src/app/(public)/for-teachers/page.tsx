import React from "react";
import Link from "next/link";
import { GraduationCap, Award, CheckSquare, Calendar, Sparkles, BookOpen } from "lucide-react";

export default function TeachersMarketingPage() {
  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-6 max-w-5xl space-y-16">
        {/* Hero Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <GraduationCap className="h-3 w-3 text-emerald-600" /> Empowering Educators
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Fewer Admin Chores, <span className="bg-gradient-to-r from-emerald-500 to-indigo-500 bg-clip-text text-transparent">More Teaching</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            EduFlow takes the friction out of daily routines. Mark student attendance in seconds, assign homework dynamically, and publish grades without manual spreadsheets.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border bg-card p-6 shadow-md hover:shadow-lg transition-all border-slate-200 dark:border-slate-800 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckSquare className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Fast Attendance</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Mark entire classroom registers in under 10 seconds. Select exceptions and click submit. Fully synced with parent logs.
            </p>
          </div>

          <div className="rounded-3xl border bg-card p-6 shadow-md hover:shadow-lg transition-all border-slate-200 dark:border-slate-800 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Homework & Materials</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Upload class syllabus materials, assign physics numericals or essay topics, and set deadline parameters dynamically.
            </p>
          </div>

          <div className="rounded-3xl border bg-card p-6 shadow-md hover:shadow-lg transition-all border-slate-200 dark:border-slate-800 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-purple-100 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Gradebook Management</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Define exam thresholds, input scores by student roster, and calculate final report card grades automatically.
            </p>
          </div>
        </div>

        {/* Detailed Section */}
        <div className="rounded-3xl bg-slate-100 dark:bg-slate-900/50 p-8 md:p-12 border border-slate-200/50 dark:border-slate-800/50 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              Your Day, Structured Beautifully
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              The Teacher Portal gathers your class schedule, subject allocations, and notifications into one sleek dashboard. Get reminders on upcoming swap lectures, check submitted homework counts, and message parents directly for student performance meetings.
            </p>
            <div className="flex gap-4">
              <Link
                href="/login"
                className="rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 transition-all"
              >
                Access Teacher Portal
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-950 border">
              <Calendar className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <h4 className="font-bold text-sm">Automated Class Timetables</h4>
                <p className="text-xs text-muted-foreground mt-1">Get automatically adjusted lecture schedules in your portal weekly.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-950 border">
              <Sparkles className="h-5 w-5 text-amber-500 mt-1" />
              <div>
                <h4 className="font-bold text-sm">Smart Analytics Dashboard</h4>
                <p className="text-xs text-muted-foreground mt-1">Visualize average subject performance trends inside individual classrooms instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
