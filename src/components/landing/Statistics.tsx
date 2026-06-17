export default function Statistics() {
  const stats = [
    { value: "10,000+", label: "Active Students" },
    { value: "500+", label: "Partner Schools" },
    { value: "99.99%", label: "Uptime SLA" },
    { value: "₹2.5M+", label: "Fees Processed" },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="rounded-3xl border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-900/50 px-8 py-12 shadow-xl grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="space-y-2 relative after:absolute after:right-0 after:top-1/4 after:h-1/2 after:w-px after:bg-slate-200 last:after:hidden dark:after:bg-slate-800">
              <p className="text-4xl font-extrabold sm:text-5xl bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                {s.value}
              </p>
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
