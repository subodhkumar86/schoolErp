import type { LucideIcon } from "lucide-react";
import {
  Bell,
  BookMarked,
  BookOpen,
  Boxes,
  CalendarCheck,
  ClipboardList,
  Clock,
  FileBarChart2,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  Settings,
  ShieldCheck,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";

import type { AppModule } from "@/features/auth/permissions";

export interface SidebarMenuItem {
  title: string;
  href: string;
  icon: LucideIcon;
  module: AppModule;
}

export const sidebarMenuItems: SidebarMenuItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    module: "dashboard",
  },
  {
    title: "Operations",
    href: "/operations",
    icon: ShieldCheck,
    module: "dashboard",
  },
  {
    title: "Academic Planner",
    href: "/planner",
    icon: FileBarChart2,
    module: "dashboard",
  },
  {
    title: "Admissions",
    href: "/admissions",
    icon: UserPlus,
    module: "admissions",
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
    title: "Subjects",
    href: "/subjects",
    icon: BookMarked,
    module: "subjects",
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
