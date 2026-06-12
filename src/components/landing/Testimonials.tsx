export default function Testimonials() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Trusted by Schools
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border p-6">
            <p>"Best ERP platform we have used."</p>
            <h4 className="mt-4 font-semibold">Principal</h4>
          </div>

          <div className="rounded-2xl border p-6">
            <p>"Attendance and fees became easy."</p>
            <h4 className="mt-4 font-semibold">Administrator</h4>
          </div>

          <div className="rounded-2xl border p-6">
            <p>"Excellent reporting features."</p>
            <h4 className="mt-4 font-semibold">School Owner</h4>
          </div>
        </div>
      </div>
    </section>
  );
}
