import { FooterContent } from "../footer/namespace";
import { HeaderAction } from "../header/namespace";
import { SidebarContent } from "../sidebar/namespace";

export function ProductCard({ name, price }: { name: string; price: string }) {
  return (
    <div className="group border border-gray-200 rounded-xl p-6 shadow-sm bg-white hover:shadow-lg transition-all duration-200 hover:border-gray-300">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          <p className="text-2xl font-semibold text-green-600 mb-6">{price}</p>
        </div>

        <HeaderAction.Hoist priority={1}>
          <button
            type="button"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            🛒 Add to Cart
          </button>
        </HeaderAction.Hoist>

        <SidebarContent.Hoist priority={2}>
          <div className="mb-3 p-2 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <button
              type="button"
              className="text-blue-700 hover:text-blue-800 font-medium text-sm transition-colors"
            >
              📱 View {name}
            </button>
          </div>
        </SidebarContent.Hoist>

        <FooterContent.Hoist priority={1}>
          <span className="text-sm text-gray-400 bg-gray-50 px-2 py-1 rounded">
            {name} - {price}
          </span>
        </FooterContent.Hoist>

        <div className="flex gap-3 mt-4">
          <button
            type="button"
            className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            📋 Details
          </button>
          <button
            type="button"
            className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 border border-gray-200"
          >
            ⚖️ Compare
          </button>
        </div>
      </div>
    </div>
  );
}
