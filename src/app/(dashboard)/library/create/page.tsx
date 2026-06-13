"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateBookForm from "@/features/library/components/CreateBookForm";

export default function CreateBookPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/library")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add Book</h1>
          <p className="text-muted-foreground">
            Add a new textbook or reading volume to library catalog
          </p>
        </div>
      </div>

      <CreateBookForm />
    </div>
  );
}
