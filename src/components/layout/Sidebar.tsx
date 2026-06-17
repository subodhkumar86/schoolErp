"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMe } from "@/features/auth/hooks/useMe";
import { hasPermission, type AppModule, type UserRole } from "@/features/auth/permissions";

import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck,
  Wallet,
  FileText,
  Settings,
  Bell,
  BookOpen,
  ClipboardList,
  Boxes,
  Clock,
  Megaphone,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
} from "lucide-react";

interface MenuItem {
  title: string;
  href: string;
  icon: LucideIcon;
  module: AppModule;
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    module: "dashboard",
  },
  {
    title: "Students",
    href: "/students",
    icon: Users,
    module: "students",
  },
  {
    title: "Teachers",
    href: "/teachers",
    icon: GraduationCap,
    module: "teachers",
  },
  {
    title: "Attendance",
    href: "/attendance",
    icon: CalendarCheck,
    module: "attendance",
  },
  {
    title: "Timetable",
    href: "/timetable",
    icon: Clock,
    module: "classes",
  },
  {
    title: "Fees",
    href: "/fees",
    icon: Wallet,
    module: "fees",
  },
  {
    title: "Exams",
    href: "/exams",
    icon: FileText,
    module: "exams",
  },
  {
    title: "Homework",
    href: "/homework",
    icon: ClipboardList,
    module: "homework",
  },
  {
    title: "Library",
    href: "/library",
    icon: BookOpen,
    module: "library",
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: Boxes,
    module: "inventory",
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
    module: "reports",
  },
  {
    title: "Notices",
    href: "/notices",
    icon: Megaphone,
    module: "notices",
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
    module: "notifications",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    module: "settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, isLoading } = useMe();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const role = user?.role as UserRole | undefined;

  // Filter links based on RBAC permissions
  const filteredMenuItems = menuItems.filter((item) => {
    if (!role) return false;
    return hasPermission(role, item.module);
  });

  return (
    <aside
      className={`hidden relative ${
        isCollapsed ? "w-20" : "w-72"
      } border-r border-slate-200/50 bg-white/90 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/90 lg:flex lg:flex-col transition-all duration-300 ease-in-out`}
    >
      {/* Collapse / Expand Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 transition-all z-50 hover:scale-105 active:scale-95"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Brand Logo Header */}
      <div
        className={`border-b border-slate-200/50 dark:border-slate-800/50 p-6 flex items-center ${
          isCollapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!isCollapsed ? (
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-black bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent leading-none">
                EduFlow ERP
              </h1>
              <p className="text-[10px] text-slate-450 dark:text-slate-400 font-bold tracking-wider uppercase mt-1">
                Commercial SaaS
              </p>
            </div>
          </div>
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 hover:scale-105 transition-transform">
            <GraduationCap className="h-5 w-5" />
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto py-6 px-3 scrollbar-thin">
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`h-11 bg-slate-100 dark:bg-slate-900 rounded-xl ${
                  isCollapsed ? "w-11 mx-auto" : "w-full"
                }`}
              />
            ))}
          </div>
        ) : (
          <nav className="space-y-1.5">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.title : undefined}
                  className={`flex items-center rounded-xl py-3 transition-all duration-200 ${
                    isCollapsed ? "justify-center px-0 w-11 mx-auto" : "gap-3 px-4"
                  } ${
                    active
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md shadow-blue-550/20"
                      : "hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 hover:text-slate-950 dark:text-slate-450 dark:hover:text-slate-100"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!isCollapsed && (
                    <span className="text-sm font-medium tracking-wide">
                      {item.title}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        )}
      </div>

      {/* Sidebar Footer */}
      <div className="border-t border-slate-200/50 dark:border-slate-800/50 p-4">
        {isCollapsed ? (
          <div className="text-center font-bold text-[10px] text-slate-400 dark:text-slate-500 py-2">
            v1.0
          </div>
        ) : (
          <div className="rounded-xl bg-slate-50/50 dark:bg-slate-900/30 p-3.5 border border-slate-100 dark:border-slate-900/60 text-center sm:text-left">
            <p className="font-semibold text-xs text-slate-800 dark:text-slate-250">
              EduFlow ERP
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
              v1.0.0 (Production)
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
