"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useBook } from "@/features/library/hooks/useBook";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil, User, Hash, Compass, BookmarkCheck } from "lucide-react";

export default function BookDetailPage() {
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/library")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Book Details</h1>
            <p className="text-muted-foreground">
              Detailed metadata and copy availability of catalog book
            </p>
          </div>
        </div>

        <Link href={`/library/${bookId}/edit`} passHref legacyBehavior>
          <Button className="flex items-center gap-2">
            <Pencil className="h-4 w-4" />
            Edit Book
          </Button>
        </Link>
      </div>

      <div className="rounded-3xl border bg-card p-8 shadow-sm space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b pb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{book.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Book ID: {book._id}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-3.5 py-1 text-xs font-semibold ${
                book.status === "Available"
                  ? "bg-green-500/20 text-green-600"
                  : book.status === "Reserved"
                    ? "bg-blue-500/20 text-blue-600"
                    : "bg-red-500/20 text-red-600"
              }`}
            >
              {book.status}
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <User className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Author & Category
              </p>
              <h4 className="font-bold text-lg mt-1">{book.author}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Category: {book.category}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500">
              <Hash className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                ISBN Reference
              </p>
              <h4 className="font-bold text-lg mt-1">
                {book.isbn || "—"}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                International Standard Book Number
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-purple-500/10 p-3 text-purple-500">
              <BookmarkCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Copy Availability
              </p>
              <h4 className="font-bold text-lg mt-1">
                {book.availableCopies} / {book.totalCopies} Available
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Total Issued: {Math.max(0, book.totalCopies - book.availableCopies)}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-orange-500/10 p-3 text-orange-500">
              <Compass className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Shelf Location
              </p>
              <h4 className="font-bold text-lg mt-1">
                {book.shelfLocation || "Not Assigned"}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Library catalog shelf code
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
