import { PriorityExample, ProductCard } from "./components";

export default function ExperimentalPage() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl shadow-lg p-8 border-2 border-purple-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-lg">
            <span className="text-white text-2xl">🧪</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-purple-900">Portal-Based Implementation</h2>
            <p className="text-purple-700 text-lg">No Providers needed - just pure Portal magic!</p>
          </div>
        </div>
        
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-purple-900 mb-4">🎉 What's Different Here?</h3>
          <ul className="space-y-3 text-purple-800">
            <li className="flex items-center gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>No Provider components</strong> in the layout</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Automatic ID generation</strong> with crypto.randomUUID()</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Same Hoist API</strong> - your components don't change!</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Portal-based rendering</strong> for better performance</span>
            </li>
          </ul>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-purple-800">
            <span className="font-semibold">Compare:</span> Check out the regular demo at{" "}
            <code className="bg-purple-200 px-2 py-1 rounded">/</code> vs this experimental version at{" "}
            <code className="bg-purple-200 px-2 py-1 rounded">/experimental</code>
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
            <span className="text-white text-xl">🛍️</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Product Showcase</h2>
            <p className="text-gray-600">Same functionality, better DX under the hood</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard name="MacBook Pro" price="$2,499" />
          <ProductCard name="iPhone 15" price="$999" />
          <ProductCard name="iPad Air" price="$599" />
          <ProductCard name="Apple Watch" price="$399" />
          <ProductCard name="AirPods Pro" price="$249" />
          <ProductCard name="Mac Studio" price="$1,999" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-green-500 to-teal-600 p-2 rounded-lg">
            <span className="text-white text-xl">🎯</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Priority Examples</h2>
            <p className="text-gray-600">Priority system works exactly the same</p>
          </div>
        </div>
        
        <PriorityExample />
      </div>
    </div>
  );
}
