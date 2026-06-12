const upcomingEvents = [
  {
    id: 1,
    title: "Mid-Term Examinations",
    date: "June 20, 2026",
    type: "Exam",
    color: "border-l-blue-500",
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    date: "June 22, 2026",
    type: "Meeting",
    color: "border-l-green-500",
  },
  {
    id: 3,
    title: "Annual Sports Day",
    date: "June 25, 2026",
    type: "Event",
    color: "border-l-orange-500",
  },
  {
    id: 4,
    title: "Fee Submission Deadline",
    date: "June 30, 2026",
    type: "Deadline",
    color: "border-l-red-500",
  },
  {
    id: 5,
    title: "Science Exhibition",
    date: "July 5, 2026",
    type: "Event",
    color: "border-l-purple-500",
  },
];

export default function UpcomingEvents() {
  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-semibold">Upcoming Events</h3>

      <div className="space-y-3">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className={`rounded-xl border border-l-4 p-3 ${event.color}`}
          >
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">{event.title}</h4>
              <span className="text-xs rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                {event.type}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
