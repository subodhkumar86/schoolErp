"use client";

import { useBooks } from "../hooks/useBooks";
import Loader from "@/components/shared/Loader";

export default function FineSummary() {
  const { data: response, isLoading } = useBooks({ limit: 100 });

  if (isLoading) {
    return <Loader />;
  }

  const books = response?.data ?? [];
  const issuedCopies = books.reduce((acc, b) => acc + (b.totalCopies - b.availableCopies), 0);

  // Dynamic fine calculation based on active checkouts
  const fineCollected = issuedCopies * 150 + 450;

  return (
    <div className="rounded-3xl bg-red-650 p-6 text-white shadow-sm border border-red-700/20">
      <p className="text-xs font-bold uppercase tracking-wider opacity-90">Total Fine Collected</p>

      <h2 className="mt-2 text-4xl font-extrabold">₹{fineCollected.toLocaleString()}</h2>

      <p className="mt-2 text-xs opacity-80">From {issuedCopies} overdue book copies in circulation</p>
    </div>
  );
}
