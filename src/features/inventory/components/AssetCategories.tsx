export default function AssetCategories() {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">Asset Categories</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Computers</span>
          <span>180</span>
        </div>

        <div className="flex justify-between">
          <span>Furniture</span>
          <span>220</span>
        </div>

        <div className="flex justify-between">
          <span>Electronics</span>
          <span>142</span>
        </div>
      </div>
    </div>
  );
}
