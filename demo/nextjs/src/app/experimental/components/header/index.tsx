import { HeaderAction } from "./namespace";

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-xl border-b border-blue-500">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur">
              <span className="text-2xl">🚀</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Lift Demo
              </h1>
              <p className="text-blue-100 text-sm">Hoistable Components</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
            <span className="text-blue-100 text-sm font-medium hidden sm:block">Cart Actions:</span>
            <HeaderAction.Slot />
          </div>
        </div>
      </div>
    </header>
  );
}

export { HeaderAction };