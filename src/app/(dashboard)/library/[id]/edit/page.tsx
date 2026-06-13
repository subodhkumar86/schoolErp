"use client";

import { useParams, useRouter } from "next/navigation";
import { useBook } from "@/features/library/hooks/useBook";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import EditBookForm from "@/features/library/components/EditBookForm";

export default function EditBookPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = params.id as string;
  const { data: book, isLoading } = useBook(bookId);

  if (isLoading) return <Loader />;

  if (!book) {
    return (
      <div className="rounded-3xl border bg-card p-6 text-center text-muted-foreground">
        Book not found in the catalog
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(`/library/${bookId}`)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Book</h1>
          <p className="text-muted-foreground">
            Update textbook or library volume catalog settings
          </p>
        </div>
      </div>

      <EditBookForm book={book} />
    </div>
  );
}
