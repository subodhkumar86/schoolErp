import { issuedBooks } from "../mock/books";

export default function IssuedBooks() {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Issued Books</h2>

      <div className="space-y-4">
        {issuedBooks.map((item) => (
          <div key={item.id} className="rounded-xl border p-4">
            <p className="font-semibold">{item.student}</p>

            <p className="text-sm text-muted-foreground">{item.book}</p>

            <p className="mt-2 text-sm">Due: {item.dueDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
