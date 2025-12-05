import { FooterContent } from "./namespace";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-white/10 p-2 rounded-lg">
              <span className="text-lg">🚀</span>
            </div>
            <div>
              <p className="font-medium text-gray-100">&copy; 2024 Lift Demo</p>
              <p className="text-xs text-gray-400">Showcasing hoistable components</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-300 text-sm hidden md:block">Product Info:</span>
            <div className="flex flex-wrap gap-2 bg-white/5 px-4 py-2 rounded-lg backdrop-blur border border-white/10">
              <FooterContent.Slot />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { FooterContent };
