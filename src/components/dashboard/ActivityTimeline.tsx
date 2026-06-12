const recentActivities = [
  {
    id: 1,
    title: "New student enrolled",
    description: "A new student was added to Class 10-A",
    time: "Just now",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Attendance marked",
    description: "Morning attendance recorded for all classes",
    time: "1 hour ago",
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Fee payment received",
    description: "Tuition fee collected from 3 students",
    time: "2 hours ago",
    color: "bg-purple-500",
  },
  {
    id: 4,
    title: "Exam scheduled",
    description: "Mid-term exams scheduled for next week",
    time: "3 hours ago",
    color: "bg-orange-500",
  },
  {
    id: 5,
    title: "Teacher added",
    description: "New faculty member joined the Mathematics dept.",
    time: "Yesterday",
    color: "bg-teal-500",
  },
];

export default function ActivityTimeline() {
  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-semibold">Recent Activities</h3>

      <div className="space-y-5">
        {recentActivities.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <div
              className={`mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full ${item.color}`}
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm">{item.title}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                {item.description}
              </p>
              <span className="text-xs text-slate-400">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
