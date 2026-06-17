import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative overflow-hidden py-20 lg:py-28 bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Decorative Gradients */}
      <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-[120px] dark:bg-blue-600/10 pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-400/20 blur-[120px] dark:bg-indigo-600/10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center space-y-8 max-w-5xl">
        {/* Banner Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/50 px-4 py-1.5 text-xs font-semibold text-blue-700 backdrop-blur-sm dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-400 animate-fade-in">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          Modern Commercial SaaS Educational Ecosystem
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl leading-none">
          Simplify School Operations &
          <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400">
            Elevate Learning Output
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          The ultimate multi-role SaaS ERP for schools, colleges, and coaching academies. Complete with automated fees billing, detailed attendance sheets, library management, and real-time student-parent notices.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-sm mx-auto">
          <Link
            href="/register"
            className="w-full px-8 py-4 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-xl shadow-blue-500/25 active:scale-95 transition-all text-center"
          >
            Start 14-Day Free Trial
          </Link>
          <Link
            href="/features"
            className="w-full px-8 py-4 text-base font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-800 dark:hover:bg-slate-800 dark:hover:border-slate-700 rounded-2xl shadow-sm active:scale-95 transition-all text-center"
          >
            Explore Features
          </Link>
        </div>

        {/* Mockup Dashboard Container */}
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200/80 bg-white/70 p-4 shadow-2xl dark:border-slate-800/80 dark:bg-slate-900/70 backdrop-blur-md mt-16 animate-fade-in hidden md:block">
          <div className="flex items-center justify-between border-b pb-3 mb-4 px-2">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <div className="rounded-lg bg-slate-100 dark:bg-slate-950 px-8 py-1 text-[11px] text-muted-foreground font-medium border">
              app.eduflow.com/dashboard
            </div>
            <div className="w-12" />
          </div>
          {/* Internal Dashboard Grid Preview */}
          <div className="grid grid-cols-3 gap-4 text-left p-2">
            <div className="col-span-2 space-y-4">
              <div className="rounded-2xl border p-4 bg-slate-50/50 dark:bg-slate-950/40 space-y-2">
                <p className="text-[10px] font-bold text-slate-400">TODAY&apos;S ATTENDANCE RATE</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold">94.8%</span>
                  <span className="text-xs text-emerald-500 font-semibold">+2.1% from last week</span>
                </div>
                <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-[94.8%] bg-blue-600 rounded-full" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border p-4 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
                  <p className="text-[10px] font-bold text-slate-400">TOTAL ACTIVE STUDENTS</p>
                  <p className="text-2xl font-black">1,248</p>
                </div>
                <div className="rounded-2xl border p-4 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
                  <p className="text-[10px] font-bold text-slate-400">TOTAL TEACHERS</p>
                  <p className="text-2xl font-black">84</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border p-4 bg-slate-50/50 dark:bg-slate-950/40 space-y-3">
              <p className="text-[10px] font-bold text-slate-400">SYSTEM HEALTH</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span>Server API</span>
                  <span className="text-emerald-500 font-bold">Online</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span>Database Scopes</span>
                  <span className="text-emerald-500 font-bold">100% Isolated</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span>Response Time</span>
                  <span className="text-slate-500 dark:text-slate-400">92ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
