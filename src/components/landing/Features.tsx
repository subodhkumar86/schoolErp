const features = [
  "Student Management",
  "Attendance Tracking",
  "Fee Management",
  "Exam Management",
  "Library Management",
  "Reports & Analytics",
];

export default function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Powerful Features
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature}
              className="rounded-2xl border bg-card p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold">{feature}</h3>

              <p className="mt-3 text-muted-foreground">
                Enterprise-grade management tools.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
