"use client";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between pt-4">
      <Button variant="outline" onClick={prevPage} disabled={currentPage === 1}>
        Previous
      </Button>

      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="outline"
        onClick={nextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
}
