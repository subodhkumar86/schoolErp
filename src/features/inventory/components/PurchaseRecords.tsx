"use client";

import React from "react";
import { useInventories } from "../hooks/useInventories";
import Loader from "@/components/shared/Loader";

export default function PurchaseRecords() {
  const { data: response, isLoading } = useInventories({ limit: 5 });
  const assets = response?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader />
      </div>
    );
  }

  return (
    <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm">
      <h2 className="mb-4 text-lg font-bold text-slate-850 dark:text-slate-100">
        Asset Cost Valuation
      </h2>

      <div className="space-y-4">
        {assets.length === 0 ? (
          <p className="text-sm text-slate-450 dark:text-slate-500 py-4 text-center">
            No assets registered yet.
          </p>
        ) : (
          assets.map((asset) => (
            <div
              key={asset._id}
              className="rounded-2xl border border-slate-100 dark:border-slate-900 p-4 bg-slate-50/20 dark:bg-slate-900/10 hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-all duration-200"
            >
              <p className="font-semibold text-slate-850 dark:text-slate-200">
                {asset.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-450 mt-1">
                Category: {asset.category} | Status: {asset.status}
              </p>
              <div className="mt-3 flex justify-between items-center text-xs">
                <span className="text-slate-400 dark:text-slate-500">Asset Cost</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  ₹{(asset.costValue ?? 0).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
