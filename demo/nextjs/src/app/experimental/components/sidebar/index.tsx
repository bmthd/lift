import { SidebarContent } from "./namespace";

export function Sidebar() {
  return (
    <aside className="w-72 bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 shadow-inner">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <div className="bg-blue-100 p-2 rounded-lg">
            <span className="text-xl">📝</span>
          </div>
          <h2 className="font-bold text-lg text-gray-800">Quick Actions</h2>
        </div>
        <div className="space-y-2">
          <SidebarContent.Slot />
        </div>
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <h3 className="font-medium text-blue-800 mb-2">💡 How it works</h3>
          <p className="text-sm text-blue-700 leading-relaxed">
            Product cards "hoist" their content here using the Lift library. This demonstrates
            component teleportation!
          </p>
        </div>
      </div>
    </aside>
  );
}

export { SidebarContent };
