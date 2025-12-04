import { PriorityExample, ProductCard } from "./components";

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto bg-white">
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          🛍️ Product Catalog
        </h1>
        <p className="text-gray-700 mb-4 text-lg">
          This demo shows how{" "}
          <code className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg font-mono text-sm">
            createHoistableComponent
          </code>{" "}
          can "teleport" React components from one part of your tree to another.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Product cards hoist action buttons to the header</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Navigation links appear in the sidebar</span>
            </li>
          </ul>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Footer content is hoisted from product cards</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Priority controls the render order</span>
            </li>
          </ul>
        </div>
      </div>

      <PriorityExample />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        <ProductCard name="MacBook Pro" price="$2,499" />
        <ProductCard name="iPhone 15" price="$999" />
        <ProductCard name="iPad Air" price="$599" />
        <ProductCard name="Apple Watch" price="$399" />
        <ProductCard name="AirPods Pro" price="$249" />
        <ProductCard name="Mac Studio" price="$1,999" />
      </div>
    </div>
  );
}
