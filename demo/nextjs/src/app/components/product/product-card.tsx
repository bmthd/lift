import { FooterContent } from "../footer/footer";
import { HeaderAction } from "../header";
import { SidebarContent } from "../sidebar/sidebar";

export function ProductCard({ name, price }: { name: string; price: string }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h3 className="font-semibold text-lg mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">{price}</p>

      <HeaderAction.Hoist priority={1}>
        <button
          type="button"
          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
        >
          Add to Cart
        </button>
      </HeaderAction.Hoist>

      <SidebarContent.Hoist priority={2}>
        <div className="mb-2">
          <button type="button" className="text-blue-600 hover:underline block">
            View {name}
          </button>
        </div>
      </SidebarContent.Hoist>

      <FooterContent.Hoist priority={1}>
        <span className="text-sm text-gray-300">
          {name} - {price}
        </span>
      </FooterContent.Hoist>

      <div className="flex gap-2">
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Details
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Compare
        </button>
      </div>
    </div>
  );
}
