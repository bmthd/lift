import { PriorityExample, ProductCard } from "./components";

export default function Page() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Product Catalog</h1>

      <div className="mb-8">
        <p className="text-gray-600 mb-4">
          This demo shows how{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">createHoistableComponent</code>
          can "teleport" React components from one part of your tree to another.
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Product cards hoist action buttons to the header</li>
          <li>Navigation links appear in the sidebar</li>
          <li>Footer content is hoisted from product cards</li>
          <li>Priority controls the render order</li>
        </ul>
      </div>

      <PriorityExample />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
