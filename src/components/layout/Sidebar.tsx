"use client";

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
    module: "classes", // timetable falls under classes permissions mapping
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

  const role = user?.role as UserRole | undefined;

  // Filter links based on RBAC permissions
  const filteredMenuItems = menuItems.filter((item) => {
    if (!role) return false;
    return hasPermission(role, item.module);
  });

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
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-10 bg-muted rounded-xl w-full" />
            ))}
          </div>
        ) : (
          <nav className="space-y-2">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                    active
                      ? "bg-primary text-primary-foreground font-medium"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        )}
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
