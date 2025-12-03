import { HeaderAction } from "../header";

export function PriorityExample() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Priority Example</h2>
      <p className="text-gray-600 mb-4">
        These components hoist content with different priorities. Lower numbers render first.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Priority 3 (Last)</h3>
          <HeaderAction.Hoist priority={3}>
            <button type="button" className="bg-red-500 text-white px-3 py-1 rounded text-sm">
              Third
            </button>
          </HeaderAction.Hoist>
        </div>

        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Priority 1 (First)</h3>
          <HeaderAction.Hoist priority={1}>
            <button type="button" className="bg-green-500 text-white px-3 py-1 rounded text-sm">
              First
            </button>
          </HeaderAction.Hoist>
        </div>

        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Priority 2 (Middle)</h3>
          <HeaderAction.Hoist priority={2}>
            <button type="button" className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
              Second
            </button>
          </HeaderAction.Hoist>
        </div>
      </div>
    </div>
  );
}