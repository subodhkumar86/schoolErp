export default function FAQ() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="mb-12 text-center text-4xl font-bold">FAQ</h2>

        <div className="space-y-6">
          <div className="rounded-2xl border p-6">
            <h3 className="font-semibold">Is EduFlow cloud based?</h3>

            <p className="mt-2 text-muted-foreground">
              Yes, fully cloud-based.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="font-semibold">Is mobile supported?</h3>

            <p className="mt-2 text-muted-foreground">Yes, fully responsive.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
