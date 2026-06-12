export default function Statistics() {
  return (
    <section className="bg-blue-600 py-20 text-white">
      <div className="container mx-auto px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-5xl font-bold">500+</h3>
            <p>Schools</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold">150K+</h3>
            <p>Students</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold">10K+</h3>
            <p>Teachers</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold">99.9%</h3>
            <p>Uptime</p>
          </div>
        </div>
      </div>
    </section>
  );
}
