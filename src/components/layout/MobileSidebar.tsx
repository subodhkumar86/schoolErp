"use client";

import Link from "next/link";
import {
  Menu,
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck,
  Wallet,
} from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="rounded-lg p-2 hover:bg-muted">
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72">
        <div className="mt-6">
          <h2 className="text-2xl font-bold">EduFlow ERP</h2>
        </div>

        <div className="mt-8 flex flex-col gap-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            href="/students"
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted"
          >
            <Users size={18} />
            Students
          </Link>

          <Link
            href="/teachers"
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted"
          >
            <GraduationCap size={18} />
            Teachers
          </Link>

          <Link
            href="/attendance"
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted"
          >
            <CalendarCheck size={18} />
            Attendance
          </Link>

          <Link
            href="/fees"
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted"
          >
            <Wallet size={18} />
            Fees
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
