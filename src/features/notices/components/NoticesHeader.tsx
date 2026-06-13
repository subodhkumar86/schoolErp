"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NoticesHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">School Announcements</h1>
        <p className="text-muted-foreground">
          Publish, edit, and track notices sent to teachers, students, or all users
        </p>
      </div>

      <Link href="/notices/create" passHref legacyBehavior>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Announcement
        </Button>
      </Link>
    </div>
  );
}
