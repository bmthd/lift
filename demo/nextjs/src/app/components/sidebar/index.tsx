import { SidebarContentSlot } from "./sidebar";

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4">
      <h2 className="font-semibold mb-4">Sidebar</h2>
      <SidebarContentSlot />
    </aside>
  );
}

export { SidebarContentProvider, SidebarContentSlot, SidebarContentHoist } from "./sidebar";
