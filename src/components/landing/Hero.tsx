"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, CheckCircle } from "lucide-react";

export default function Hero() {
  const [activeRole, setActiveRole] = useState<"admin" | "teacher" | "parent">("admin");

  return (
    <div className="relative overflow-hidden py-20 lg:py-28 bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Decorative Gradients */}
      <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-[120px] dark:bg-blue-600/10 pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-400/20 blur-[120px] dark:bg-indigo-600/10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center space-y-8 max-w-5xl">
        {/* Banner Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/50 px-4 py-1.5 text-xs font-semibold text-blue-700 backdrop-blur-sm dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-400 animate-fade-in">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          Modern Commercial SaaS Educational Ecosystem
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl leading-none">
          Simplify School Operations &
          <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400">
            Elevate Learning Output
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          The ultimate multi-role SaaS ERP for schools, colleges, and coaching academies. Complete with automated fees billing, detailed attendance sheets, library management, and real-time student-parent notices.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-sm mx-auto">
          <Link
            href="/register"
            className="w-full px-8 py-4 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-xl shadow-blue-500/25 active:scale-95 transition-all text-center"
          >
            Start 14-Day Free Trial
          </Link>
          <Link
            href="/features"
            className="w-full px-8 py-4 text-base font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-800 dark:hover:bg-slate-800 dark:hover:border-slate-700 rounded-2xl shadow-sm active:scale-95 transition-all text-center"
          >
            Explore Features
          </Link>
        </div>

        {/* Mockup Dashboard Container */}
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200/80 bg-white/70 p-4 shadow-2xl dark:border-slate-800/80 dark:bg-slate-900/70 backdrop-blur-md mt-16 animate-fade-in hidden md:block">
          <div className="flex items-center justify-between border-b pb-3 mb-4 px-2">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            {/* Tabs for interactive preview */}
            <div className="flex gap-1 border rounded-xl bg-slate-100/85 p-1 dark:bg-slate-950/80">
              <button
                onClick={() => setActiveRole("admin")}
                className={`rounded-lg px-4 py-1 text-xs font-bold transition-all ${
                  activeRole === "admin"
                    ? "bg-white text-blue-600 shadow-sm dark:bg-slate-900 dark:text-blue-400"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                Admin View
              </button>
              <button
                onClick={() => setActiveRole("teacher")}
                className={`rounded-lg px-4 py-1 text-xs font-bold transition-all ${
                  activeRole === "teacher"
                    ? "bg-white text-blue-600 shadow-sm dark:bg-slate-900 dark:text-blue-400"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                Teacher View
              </button>
              <button
                onClick={() => setActiveRole("parent")}
                className={`rounded-lg px-4 py-1 text-xs font-bold transition-all ${
                  activeRole === "parent"
                    ? "bg-white text-blue-600 shadow-sm dark:bg-slate-900 dark:text-blue-400"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                Parent & Student View
              </button>
            </div>
            <div className="w-12 text-right text-[10px] text-muted-foreground hidden lg:block">
              Live Preview
            </div>
          </div>

          {/* Internal Dashboard Grid Preview - Dynamic depending on role selection */}
          <div className="p-2 transition-all duration-300">
            {activeRole === "admin" && (
              <div className="grid grid-cols-3 gap-4 text-left animate-fade-in">
                <div className="col-span-2 space-y-4">
                  <div className="rounded-2xl border p-4 bg-slate-50/50 dark:bg-slate-950/40 space-y-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Today&apos;s Attendance Rate</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">94.8%</span>
                      <span className="text-xs text-emerald-500 font-semibold">+2.1% from last week</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full w-[94.8%] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border p-4 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Active Students</p>
                      <p className="text-2xl font-black">1,248</p>
                      <p className="text-[10px] text-slate-400">Delhi & Noida Branches</p>
                    </div>
                    <div className="rounded-2xl border p-4 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Active Teachers</p>
                      <p className="text-2xl font-black">84</p>
                      <p className="text-[10px] text-slate-400">Across 6 Departments</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border p-4 bg-slate-50/50 dark:bg-slate-950/40 space-y-4 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">SaaS Tenant Guard</p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500">Database Scopes</span>
                        <span className="text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full text-[10px]">100% Isolated</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500">Subscription Status</span>
                        <span className="text-blue-500 font-bold bg-blue-500/10 px-2 py-0.5 rounded-full text-[10px]">Trial Active</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500">Response Latency</span>
                        <span className="text-slate-700 dark:text-slate-300 font-semibold">92ms</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <Shield className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                    Multi-tenant data isolation enabled
                  </div>
                </div>
              </div>
            )}

            {activeRole === "teacher" && (
              <div className="grid grid-cols-3 gap-4 text-left animate-fade-in">
                <div className="col-span-2 space-y-4">
                  <div className="rounded-2xl border p-4 bg-slate-50/50 dark:bg-slate-950/40 space-y-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">My Assigned Classes</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">Class 10-A</span>
                      <span className="text-xs text-indigo-500 font-semibold">Science & Physics</span>
                    </div>
                    <div className="text-xs text-slate-550 flex justify-between mt-1">
                      <span>Curriculum Syllabus Covered</span>
                      <span>85% Completed</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full w-[85%] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border p-4 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Attendance Marked Today</p>
                      <p className="text-2xl font-black text-emerald-500">Yes</p>
                      <p className="text-[10px] text-slate-400">42/42 Students logged</p>
                    </div>
                    <div className="rounded-2xl border p-4 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Grading Queue</p>
                      <p className="text-2xl font-black text-amber-500">14</p>
                      <p className="text-[10px] text-slate-400">Pending Homework papers</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border p-4 bg-slate-50/50 dark:bg-slate-950/40 space-y-4 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Active Classroom Tools</p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500">Scheduled Exams</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Physics Midterm</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500">Uploaded Homeworks</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Mechanics Practice</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500">Class Timetable Slot</span>
                        <span className="text-blue-500 font-semibold">09:00 - 10:00 AM</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    Homework auto-notifies parents
                  </div>
                </div>
              </div>
            )}

            {activeRole === "parent" && (
              <div className="grid grid-cols-3 gap-4 text-left animate-fade-in">
                <div className="col-span-2 space-y-4">
                  <div className="rounded-2xl border p-4 bg-slate-50/50 dark:bg-slate-950/40 space-y-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Student Profile Overview</p>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                        SK
                      </div>
                      <div>
                        <h4 className="font-bold text-base leading-tight">Subodh Kumar</h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">Class 10-A | Roll Number: ROLL101</p>
                      </div>
                    </div>
                    <div className="text-xs text-slate-550 flex justify-between mt-2">
                      <span>Term Attendance Percentage</span>
                      <span className="text-emerald-500 font-bold">92% (Excellent)</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full w-[92%] bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border p-4 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recent Test Result</p>
                      <p className="text-2xl font-black text-blue-600 dark:text-blue-400">Grade A</p>
                      <p className="text-[10px] text-slate-400">Physics Midterm (88/100)</p>
                    </div>
                    <div className="rounded-2xl border p-4 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Invoice Due</p>
                      <p className="text-2xl font-black text-rose-500">₹12,500</p>
                      <p className="text-[10px] text-slate-400">Tuition Fee | Due in 10 Days</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border p-4 bg-slate-50/50 dark:bg-slate-950/40 space-y-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Real-time School Notices</p>
                  <div className="space-y-3">
                    <div className="rounded-xl border p-2 bg-white/55 dark:bg-slate-950/60 text-[11px] space-y-1 shadow-xs">
                      <p className="font-bold text-slate-700 dark:text-slate-300">Annual Sports Meet 2026</p>
                      <p className="text-slate-550 line-clamp-2">Annual sports day will be held on July 10th. Registrations are open.</p>
                    </div>
                    <div className="rounded-xl border p-2 bg-white/55 dark:bg-slate-950/60 text-[11px] space-y-1 shadow-xs">
                      <p className="font-bold text-slate-700 dark:text-slate-300">Term 1 Syllabus Updated</p>
                      <p className="text-slate-550 line-clamp-2">Science syllabus has been updated. Chapter list modified.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
