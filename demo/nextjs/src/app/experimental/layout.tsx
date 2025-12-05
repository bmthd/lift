import type { ReactNode } from "react";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Sidebar } from "./components/sidebar";

export default function ExperimentalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 p-6 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
              <h1 className="text-2xl font-bold text-blue-900 mb-2">
                🧪 Experimental Portal Implementation
              </h1>
              <p className="text-blue-800">
                This page demonstrates the new Portal-based implementation of lift. 
                Notice how there are <strong>no Provider components</strong> needed in the layout!
              </p>
            </div>
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}