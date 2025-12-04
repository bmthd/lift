import type { Metadata } from "next";
import { Header, HeaderAction } from "./components/header";
import "./globals.css";
import type { PropsWithChildren, ReactNode } from "react";
import { Footer, FooterContent } from "./components/footer";
import { Sidebar, SidebarContent } from "./components/sidebar";

export const metadata: Metadata = {
  title: "createHoistableComponent Demo",
  description: "Demo of createHoistableComponent from lift library",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 p-8 overflow-auto">{children}</main>
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

interface ProvidersProps extends PropsWithChildren {}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <HeaderAction.Provider>
      <SidebarContent.Provider>
        <FooterContent.Provider>{children}</FooterContent.Provider>
      </SidebarContent.Provider>
    </HeaderAction.Provider>
  );
};
