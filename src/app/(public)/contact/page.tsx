"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", school: "", message: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    // Simulate contact submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);

    toast.success("Thank you for contacting us! We will get back to you shortly.");
    setForm({ name: "", email: "", school: "", message: "" });
  };

  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-6 max-w-xl space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black sm:text-5xl bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Have questions about our pricing plans, custom branding, or server setup? Send us a message!
          </p>
        </div>

        <form onSubmit={onSubmit} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Name *</label>
            <input
              type="text"
              required
              disabled={submitting}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your Name"
              className="w-full rounded-2xl border border-slate-250 bg-slate-50 px-4 py-3 text-sm focus:border-blue-600 focus:bg-white focus:outline-none dark:border-slate-850 dark:bg-slate-950"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address *</label>
            <input
              type="email"
              required
              disabled={submitting}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@school.com"
              className="w-full rounded-2xl border border-slate-250 bg-slate-50 px-4 py-3 text-sm focus:border-blue-600 focus:bg-white focus:outline-none dark:border-slate-850 dark:bg-slate-950"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">School Name</label>
            <input
              type="text"
              disabled={submitting}
              value={form.school}
              onChange={(e) => setForm({ ...form, school: e.target.value })}
              placeholder="Global Public School"
              className="w-full rounded-2xl border border-slate-250 bg-slate-50 px-4 py-3 text-sm focus:border-blue-600 focus:bg-white focus:outline-none dark:border-slate-850 dark:bg-slate-950"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Message *</label>
            <textarea
              required
              disabled={submitting}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="How can we help you?"
              rows={4}
              className="w-full rounded-2xl border border-slate-250 bg-slate-50 px-4 py-3 text-sm focus:border-blue-600 focus:bg-white focus:outline-none dark:border-slate-850 dark:bg-slate-950 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-2xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending Message...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
