"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useMe } from "@/features/auth/hooks/useMe";
import { hasPermission, type UserRole } from "@/features/auth/permissions";
import { sidebarMenuItems } from "@/constants/sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function MobileSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user } = useMe();
  const role = user?.role as UserRole | undefined;

  const filteredMenuItems = sidebarMenuItems.filter((item) => {
    if (!role) return false;
    return hasPermission(role, item.module);
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="rounded-lg p-2 hover:bg-muted">
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72 flex flex-col h-full bg-card">
        <div className="mt-6 border-b pb-4">
          <h2 className="text-2xl font-bold">EduFlow ERP</h2>
          <p className="text-xs text-muted-foreground">Mobile Menu</p>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto pr-2">
          <div className="flex flex-col gap-1">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-xl p-3 transition-all ${
                    active
                      ? "bg-primary text-primary-foreground font-medium"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
