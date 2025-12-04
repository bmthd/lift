import { HeaderActionSlot } from "./header-action";

export function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">createHoistableComponent Demo</h1>
        <div className="flex gap-2">
          <HeaderActionSlot />
        </div>
      </div>
    </header>
  );
}

export { HeaderActionProvider, HeaderActionSlot, HeaderActionHoist } from "./header-action";