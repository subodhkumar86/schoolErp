import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 text-center">
        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-600">
          Modern School ERP Platform
        </span>

        <h1 className="mt-8 text-6xl font-bold">
          Manage Your School
          <span className="block text-blue-600">Smarter Than Ever</span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-xl text-muted-foreground">
          EduFlow ERP helps schools manage students, teachers, attendance, fees,
          examinations, reports, and operations from one platform.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Button size="lg">Get Started</Button>

          <Button variant="outline" size="lg">
            Live Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
