"use client";

import { Bell, Search, ChevronDown } from "lucide-react";

import { Input } from "@/components/ui/input";
import ThemeToggle from "@/components/shared/ThemeToggle";
import MobileSidebar from "./MobileSidebar";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-background/95 backdrop-blur">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <div className="lg:hidden">
            <MobileSidebar />
          </div>

          <div>
            <h1 className="text-lg font-bold">EduFlow ERP</h1>

            <p className="hidden text-xs text-muted-foreground md:block">
              School Management System
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="hidden w-full max-w-xl md:block">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

            <Input
              placeholder="Search students, teachers, classes..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Notification */}
          <button className="relative rounded-xl border p-2 hover:bg-muted">
            <Bell className="h-5 w-5" />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* User */}
          <div className="flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 hover:bg-muted">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              A
            </div>

            <div className="hidden md:block">
              <p className="text-sm font-semibold">Admin User</p>

              <p className="text-xs text-muted-foreground">Super Admin</p>
            </div>

            <ChevronDown className="hidden h-4 w-4 md:block" />
          </div>
        </div>
      </div>
    </header>
  );
}
