"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  Users,
  GraduationCap,
  CalendarCheck,
  Wallet,
  BookOpen,
  ClipboardList,
  FileText,
  AlertTriangle,
  FileCheck,
  CheckCircle,
  Layers,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

// ----------------------------------------------------
// 1. SUPER ADMIN DASHBOARD
// ----------------------------------------------------
export function SuperAdminDashboard({ stats }: { stats: any }) {
  const schools = stats?.schools || [];
  const planData = [
    { name: "Starter", value: stats?.planSplit?.find((p: any) => p._id === "Starter")?.count || 0, color: "#3B82F6" },
    { name: "Professional", value: stats?.planSplit?.find((p: any) => p._id === "Professional")?.count || 0, color: "#10B981" },
    { name: "Enterprise", value: stats?.planSplit?.find((p: any) => p._id === "Enterprise")?.count || 0, color: "#8B5CF6" },
  ].filter((p) => p.value > 0);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Schools */}
        <div className="relative overflow-hidden border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-blue-500/20 dark:hover:border-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-blue-500/5 blur-xl group-hover:bg-blue-500/10 transition-all" />
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Schools</p>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 mt-1">{stats?.totalSchools ?? 0}</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
              <Building2 className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Active Subscriptions */}
        <div className="relative overflow-hidden border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-emerald-500/20 dark:hover:border-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-emerald-500/5 blur-xl group-hover:bg-emerald-500/10 transition-all" />
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Active Plans</p>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 mt-1">{stats?.activeSubscriptions ?? 0}</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
              <CheckCircle className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Global Revenue */}
        <div className="relative overflow-hidden border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-purple-500/20 dark:hover:border-purple-500/20 transition-all duration-300 hover:-translate-y-0.5 group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-purple-500/5 blur-xl group-hover:bg-purple-500/10 transition-all" />
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Global Revenue</p>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 mt-1">₹{(stats?.platformMonthlyRevenue ?? 0).toLocaleString()}/mo</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
              <Wallet className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Total SaaS Users */}
        <div className="relative overflow-hidden border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-indigo-500/20 dark:hover:border-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-indigo-500/5 blur-xl group-hover:bg-indigo-500/10 transition-all" />
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total SaaS Users</p>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 mt-1">{stats?.totalUsers ?? 0}</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500/10 to-blue-500/10 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
              <Users className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Subscription Plan Distribution */}
        <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm space-y-4">
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-50">Subscription Plan Distribution</h4>
          {planData.length === 0 ? (
            <div className="h-[250px] flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm">No subscriptions seeded yet.</div>
          ) : (
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={planData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                    {planData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Platform Tenant List */}
        <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm space-y-4 overflow-hidden">
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-50">Platform Tenant List</h4>
          <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-900">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/40 text-slate-550 dark:text-slate-400 font-semibold">
                  <th className="p-3">School</th>
                  <th className="p-3">Slug</th>
                  <th className="p-3">Plan</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {schools.map((s: any) => (
                  <tr key={s._id} className="border-b border-slate-100 last:border-0 dark:border-slate-900 hover:bg-slate-50/60 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">{s.name}</td>
                    <td className="p-3 capitalize text-xs text-slate-500 dark:text-slate-400">{s.slug}</td>
                    <td className="p-3 text-xs font-medium text-slate-600 dark:text-slate-300">{s.subscription?.plan || "Starter"}</td>
                    <td className="p-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        s.subscription?.status === "Active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" : "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
                      }`}>
                        {s.subscription?.status || "Trial"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 2. ADMIN DASHBOARD
// ----------------------------------------------------
export function AdminDashboard({ stats: _stats }: { stats: any }) {
  return (
    <div className="space-y-6">
      {/* Dynamic modules standard dashboard */}
    </div>
  );
}

// ----------------------------------------------------
// 3. TEACHER DASHBOARD
// ----------------------------------------------------
export function TeacherDashboard({ stats: _stats }: { stats: any }) {
  const teacherStats = [
    { value: "4", label: "My Classes", icon: Layers, color: "from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400" },
    { value: "Physics", label: "Primary Subject", icon: GraduationCap, color: "from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400" },
    { value: "95%", label: "Today Attendance", icon: CalendarCheck, color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400" },
    { value: "2", label: "Active Homeworks", icon: ClipboardList, color: "from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {teacherStats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="relative overflow-hidden border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-blue-500/20 dark:hover:border-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 group">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-blue-500/5 blur-xl group-hover:bg-blue-500/10 transition-all" />
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{s.label}</p>
                  <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 mt-1">{s.value}</h3>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr ${s.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Class Schedule */}
        <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm space-y-4">
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-50">Today&apos;s Class Schedule</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-4 border border-slate-100 dark:border-slate-900 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">Physics Lecture (Class 10-A)</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">09:00 AM - 10:00 AM | Room: Lab 2</p>
              </div>
              <span className="rounded-full bg-blue-100/70 text-blue-700 text-xs px-2.5 py-1 font-semibold dark:bg-blue-950/30 dark:text-blue-400">Completed</span>
            </div>
            <div className="flex justify-between items-center p-4 border border-slate-100 dark:border-slate-900 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">Mathematics Swap (Class 9-B)</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">11:30 AM - 12:30 PM | Room: Class 4</p>
              </div>
              <span className="rounded-full bg-amber-100/70 text-amber-700 text-xs px-2.5 py-1 font-semibold dark:bg-amber-950/30 dark:text-amber-400">Ongoing</span>
            </div>
          </div>
        </div>

        {/* Quick Shortcuts */}
        <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm space-y-4">
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-50">Quick Shortcuts</h4>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/attendance" className="rounded-2xl border border-slate-200/60 p-4 text-center hover:bg-blue-50 dark:hover:bg-slate-900 hover:border-blue-500/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-semibold text-slate-700 dark:text-slate-300">
              Mark Attendance
            </Link>
            <Link href="/homework" className="rounded-2xl border border-slate-200/60 p-4 text-center hover:bg-blue-50 dark:hover:bg-slate-900 hover:border-blue-500/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-semibold text-slate-700 dark:text-slate-300">
              Add Homework
            </Link>
            <Link href="/exams" className="rounded-2xl border border-slate-200/60 p-4 text-center hover:bg-blue-50 dark:hover:bg-slate-900 hover:border-blue-500/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-semibold text-slate-700 dark:text-slate-300">
              Publish Results
            </Link>
            <Link href="/settings" className="rounded-2xl border border-slate-200/60 p-4 text-center hover:bg-blue-50 dark:hover:bg-slate-900 hover:border-blue-500/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-semibold text-slate-700 dark:text-slate-300">
              My Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 4. STUDENT DASHBOARD
// ----------------------------------------------------
export function StudentDashboard({ stats: _stats }: { stats: any }) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Attendance */}
        <div className="relative overflow-hidden border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-blue-500/20 dark:hover:border-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-blue-500/5 blur-xl group-hover:bg-blue-500/10 transition-all" />
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">My Attendance</p>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 mt-1">92%</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
              <CalendarCheck className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Due Homework */}
        <div className="relative overflow-hidden border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-amber-500/20 dark:hover:border-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-amber-500/5 blur-xl group-hover:bg-amber-500/10 transition-all" />
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Due Homeworks</p>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 mt-1">1</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform duration-300">
              <ClipboardList className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Last Grade */}
        <div className="relative overflow-hidden border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-emerald-500/20 dark:hover:border-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-emerald-500/5 blur-xl group-hover:bg-emerald-500/10 transition-all" />
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Last Exam Grade</p>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 mt-1">A</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
              <FileCheck className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Books Borrowed */}
        <div className="relative overflow-hidden border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-purple-500/20 dark:hover:border-purple-500/20 transition-all duration-300 hover:-translate-y-0.5 group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-purple-500/5 blur-xl group-hover:bg-purple-500/10 transition-all" />
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Books Borrowed</p>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 mt-1">0</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Notices */}
        <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm space-y-4">
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-50">Notices & Announcements</h4>
          <div className="space-y-4">
            <div className="p-4 border border-slate-100 dark:border-slate-900 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">June 16, 2026</span>
              <h5 className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-1">Term 1 Syllabus Updated</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Science syllabus has been revised in class folder. Physics Chapter 4 remains.</p>
            </div>
            <div className="p-4 border border-slate-100 dark:border-slate-900 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">June 12, 2026</span>
              <h5 className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-1">Annual Sports Meet Registrations</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Track event registrations close by next Friday.</p>
            </div>
          </div>
        </div>

        {/* Assignments */}
        <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm space-y-4">
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-50">Pending Assignments</h4>
          <div className="p-4 border border-slate-100 dark:border-slate-900 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors flex justify-between items-center">
            <div>
              <p className="font-bold text-sm text-slate-800 dark:text-slate-200">Physics Chapter 4 Numericals</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Due: In 2 Days | Max points: 20</p>
            </div>
            <span className="rounded-full bg-amber-100/70 text-amber-700 text-xs px-2.5 py-1 font-semibold dark:bg-amber-950/30 dark:text-amber-400">Incomplete</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 5. PARENT PORTAL DASHBOARD
// ----------------------------------------------------
export function ParentDashboard({ stats: _stats }: { stats: any }) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Profile Card */}
      <div className="border border-slate-200/50 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-3xl shadow-lg flex flex-col md:flex-row gap-6 justify-between items-start md:items-center text-white">
        <div>
          <h3 className="text-2xl font-black tracking-tight">Child Profile: Subodh Kumar</h3>
          <p className="text-sm text-blue-100 mt-1">Class 10-A | Roll No: ROLL101 | Global Academy</p>
        </div>
        <span className="rounded-full bg-white/20 text-white text-xs px-3.5 py-1.5 font-bold backdrop-blur-md">
          Active Enrollment
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Attendance */}
        <div className="relative overflow-hidden border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-blue-500/20 dark:hover:border-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-blue-500/5 blur-xl group-hover:bg-blue-500/10 transition-all" />
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Attendance Rate</p>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 mt-1">92%</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
              <CalendarCheck className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Overdue Homework */}
        <div className="relative overflow-hidden border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-amber-500/20 dark:hover:border-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-amber-500/5 blur-xl group-hover:bg-amber-500/10 transition-all" />
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Overdue Homeworks</p>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 mt-1">1</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform duration-300">
              <ClipboardList className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Physics Marks */}
        <div className="relative overflow-hidden border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-emerald-500/20 dark:hover:border-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-emerald-500/5 blur-xl group-hover:bg-emerald-500/10 transition-all" />
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Midterm Physics Marks</p>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 mt-1">88% (Grade A)</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
              <FileCheck className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Fees */}
        <div className="relative overflow-hidden border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-rose-500/20 dark:hover:border-rose-500/20 transition-all duration-300 hover:-translate-y-0.5 group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-rose-500/5 blur-xl group-hover:bg-rose-500/10 transition-all" />
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Pending Term Fees</p>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 mt-1">₹12,500</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-500/10 to-pink-500/10 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform duration-300">
              <Wallet className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Child Performance Chart */}
        <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm space-y-4">
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-50">Child Performance Chart</h4>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { subject: "Maths", marks: 95 },
                { subject: "Physics", marks: 88 },
                { subject: "Chemistry", marks: 74 },
                { subject: "English", marks: 82 },
              ]}>
                <defs>
                  <linearGradient id="marksGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="subject" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }} />
                <Area type="monotone" dataKey="marks" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#marksGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Child Fee Status */}
        <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm space-y-4">
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-50">Child Fee Status</h4>
          <div className="p-4 border border-rose-100/60 dark:border-rose-950/30 rounded-2xl bg-rose-50/50 dark:bg-rose-950/10 flex justify-between items-center">
            <div>
              <p className="font-bold text-sm text-rose-800 dark:text-rose-400">First Term Tuition Fee</p>
              <p className="text-xs text-rose-600/80 dark:text-rose-500/80 mt-0.5">Due: Next Monday | Invoice: #INV-001</p>
            </div>
            <Link href="/fees" className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs px-4 py-2 font-bold transition-all shadow-md shadow-rose-500/25 active:scale-95">
              Pay Fee
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 6. ACCOUNTANT DASHBOARD
// ----------------------------------------------------
export function AccountantDashboard({ stats: _stats }: { stats: any }) {
  const items = [
    { value: "₹1,25,000", label: "Collected Fees", icon: Wallet, color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400" },
    { value: "₹24,000", label: "Pending Fees", icon: AlertTriangle, color: "from-rose-500/10 to-pink-500/10 text-rose-600 dark:text-rose-400" },
    { value: "12", label: "Total Invoices", icon: FileText, color: "from-indigo-500/10 to-blue-500/10 text-indigo-600 dark:text-indigo-400" },
    { value: "2", label: "Defaults Alert", icon: AlertTriangle, color: "from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="relative overflow-hidden border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-blue-500/20 dark:hover:border-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 group">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-blue-500/5 blur-xl group-hover:bg-blue-500/10 transition-all" />
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{s.label}</p>
                  <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 mt-1">{s.value}</h3>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr ${s.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Graph */}
        <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm space-y-4">
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-50">Revenue Graph</h4>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { month: "Jan", collected: 45000 },
                { month: "Feb", collected: 62000 },
                { month: "Mar", collected: 90000 },
                { month: "Apr", collected: 125000 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }} />
                <Bar dataKey="collected" fill="#10B981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm space-y-4">
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-50">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/fees" className="rounded-2xl border border-slate-200/60 p-4 text-center hover:bg-blue-50 dark:hover:bg-slate-900 hover:border-blue-500/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-semibold text-slate-700 dark:text-slate-300">
              Record Payment
            </Link>
            <Link href="/fees" className="rounded-2xl border border-slate-200/60 p-4 text-center hover:bg-blue-50 dark:hover:bg-slate-900 hover:border-blue-500/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-semibold text-slate-700 dark:text-slate-300">
              Create Invoice
            </Link>
            <Link href="/reports" className="rounded-2xl border border-slate-200/60 p-4 text-center hover:bg-blue-50 dark:hover:bg-slate-900 hover:border-blue-500/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-semibold text-slate-700 dark:text-slate-300">
              Fee Reports
            </Link>
            <Link href="/settings" className="rounded-2xl border border-slate-200/60 p-4 text-center hover:bg-blue-50 dark:hover:bg-slate-900 hover:border-blue-500/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-semibold text-slate-700 dark:text-slate-300">
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 7. LIBRARIAN DASHBOARD
// ----------------------------------------------------
export function LibrarianDashboard({ stats: _stats }: { stats: any }) {
  const items = [
    { value: "480", label: "Catalog Books", icon: BookOpen, color: "from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400" },
    { value: "18", label: "Issued Copies", icon: ClipboardList, color: "from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400" },
    { value: "3", label: "Overdue Pending", icon: AlertTriangle, color: "from-rose-500/10 to-pink-500/10 text-rose-600 dark:text-rose-400" },
    { value: "₹450", label: "Fines Collected", icon: Wallet, color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="relative overflow-hidden border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-blue-500/20 dark:hover:border-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 group">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-blue-500/5 blur-xl group-hover:bg-blue-500/10 transition-all" />
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{s.label}</p>
                  <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 mt-1">{s.value}</h3>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr ${s.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Overdue Issues */}
        <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm space-y-4">
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-50">Recent Overdue Issues</h4>
          <div className="space-y-3">
            <div className="p-4 border border-rose-100/60 dark:border-rose-950/30 rounded-2xl bg-rose-50/50 dark:bg-rose-950/10 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors flex justify-between items-center">
              <div>
                <p className="font-bold text-sm text-rose-800 dark:text-rose-450">Introduction to Mechanics</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Borrower: Subodh Kumar | Due: 5 Days ago</p>
              </div>
              <span className="rounded-full bg-rose-100 text-rose-700 text-xs px-2.5 py-1 font-semibold dark:bg-rose-950/30 dark:text-rose-400">Fine ₹50</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm space-y-4">
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-50">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/library" className="rounded-2xl border border-slate-200/60 p-4 text-center hover:bg-blue-50 dark:hover:bg-slate-900 hover:border-blue-500/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-semibold text-slate-700 dark:text-slate-300">
              Issue Book
            </Link>
            <Link href="/library" className="rounded-2xl border border-slate-200/60 p-4 text-center hover:bg-blue-50 dark:hover:bg-slate-900 hover:border-blue-500/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-semibold text-slate-700 dark:text-slate-300">
              Return Book
            </Link>
            <Link href="/library" className="rounded-2xl border border-slate-200/60 p-4 text-center hover:bg-blue-50 dark:hover:bg-slate-900 hover:border-blue-500/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-semibold text-slate-700 dark:text-slate-300">
              Add New Book
            </Link>
            <Link href="/reports" className="rounded-2xl border border-slate-200/60 p-4 text-center hover:bg-blue-50 dark:hover:bg-slate-900 hover:border-blue-500/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-semibold text-slate-700 dark:text-slate-300">
              Catalog Report
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
