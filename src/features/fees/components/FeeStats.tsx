"use client";

import { useFees } from "../hooks/useFees";

function formatCurrency(amount: number) {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount}`;
}

export default function FeeStats() {
  const { data: response } = useFees();
  const stats = response?.stats ?? [];
  const total = response?.total ?? 0;

  const paid = stats.find((s) => s._id === "Paid")?.total ?? 0;
  const pending = stats.find((s) => s._id === "Pending")?.total ?? 0;
  const paidCount = stats.find((s) => s._id === "Paid")?.count ?? 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">Total Records</p>
        <h2 className="mt-2 text-3xl font-bold">{total}</h2>
      </div>

      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">Revenue Collected</p>
        <h2 className="mt-2 text-3xl font-bold text-green-500">
          {formatCurrency(paid)}
        </h2>
      </div>

      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">Pending Fees</p>
        <h2 className="mt-2 text-3xl font-bold text-red-500">
          {formatCurrency(pending)}
        </h2>
      </div>

      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">Students Paid</p>
        <h2 className="mt-2 text-3xl font-bold text-blue-500">{paidCount}</h2>
      </div>
    </div>
  );
}
