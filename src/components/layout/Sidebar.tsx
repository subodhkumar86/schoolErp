"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Students",
    href: "/students",
    icon: Users,
  },
  {
    title: "Teachers",
    href: "/teachers",
    icon: GraduationCap,
  },
  {
    title: "Attendance",
    href: "/attendance",
    icon: CalendarCheck,
  },
  {
    title: "Fees",
    href: "/fees",
    icon: Wallet,
  },
  {
    title: "Exams",
    href: "/exams",
    icon: FileText,
  },
  {
    title: "Homework",
    href: "/homework",
    icon: ClipboardList,
  },
  {
    title: "Library",
    href: "/library",
    icon: BookOpen,
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: Boxes,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 border-r bg-card lg:flex lg:flex-col">
      {/* Logo */}
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold">EduFlow ERP</h1>

        <p className="text-sm text-muted-foreground">
          School Management System
        </p>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <Icon className="h-5 w-5" />

                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="rounded-xl bg-muted p-4">
          <p className="font-medium">EduFlow ERP</p>

          <p className="text-xs text-muted-foreground">Version 1.0.0</p>
        </div>
      </div>
    </aside>
  );
}
