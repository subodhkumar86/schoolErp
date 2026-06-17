const testimonials = [
  {
    quote: "EduFlow ERP transformed our fee collection completely. We saw a 30% reduction in overdue fee payments within the first quarter itself, thanks to automated alerts.",
    author: "Sister Mary D'Souza",
    role: "Principal, St. Xavier Academy",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
  },
  {
    quote: "As a teacher, I love how easy it is to schedule homework and mark attendance. The timetable scheduler handles all physics/chemistry class swaps effortlessly.",
    author: "Mr. Aditya Roy",
    role: "Physics Department, Apex School",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
  },
  {
    quote: "Parent-teacher transparency is at an all time high. Getting notice logs and academic results on the parent app makes it simple to monitor child progress.",
    author: "Rajesh & Priya Sen",
    role: "Parents of Rohan (Class 8)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="container mx-auto px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Trusted by Educators
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Hear from school principals, subject teachers, parents, and librarians using our dashboard daily.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-slate-200/50 bg-slate-50/50 p-8 flex flex-col justify-between hover:bg-white hover:shadow-xl hover:scale-[1.02] transition-all duration-300 dark:border-slate-800/50 dark:bg-slate-950/40 dark:hover:bg-slate-950"
            >
              <p className="text-slate-600 dark:text-slate-300 italic leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4 border-t pt-6 border-slate-200/50 dark:border-slate-800/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="h-12 w-12 rounded-full object-cover shadow-md"
                />
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100">{t.author}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
