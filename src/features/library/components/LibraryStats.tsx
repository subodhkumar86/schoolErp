export default function LibraryStats() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-2xl bg-blue-600 p-6 text-white">
        <p>Total Books</p>
        <h2 className="text-3xl font-bold">1250</h2>
      </div>

      <div className="rounded-2xl bg-green-600 p-6 text-white">
        <p>Available</p>
        <h2 className="text-3xl font-bold">980</h2>
      </div>

      <div className="rounded-2xl bg-orange-500 p-6 text-white">
        <p>Issued</p>
        <h2 className="text-3xl font-bold">270</h2>
      </div>

      <div className="rounded-2xl bg-red-500 p-6 text-white">
        <p>Overdue</p>
        <h2 className="text-3xl font-bold">18</h2>
      </div>
    </div>
  );
}
