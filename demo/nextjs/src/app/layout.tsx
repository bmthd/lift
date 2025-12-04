import type { Metadata } from "next";
import { Header, HeaderAction } from "./components/header";
import "./globals.css";
import { FooterContent } from "./components/footer/footer";
import { SidebarContent } from "./components/sidebar/sidebar";
import { Footer } from "./components/footer";
import { Sidebar } from "./components/sidebar";

export const metadata: Metadata = {
  title: "createHoistableComponent Demo",
  description: "Demo of createHoistableComponent from lift library",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <HeaderAction.Provider>
            <Header />
          </HeaderAction.Provider>
          <div className="flex flex-1">
            <SidebarContent.Provider>
              <Sidebar />
            </SidebarContent.Provider>
            <main className="flex-1 p-6">{children}</main>
          </div>
          <FooterContent.Provider>
            <Footer />
          </FooterContent.Provider>
        </div>
      </body>
    </html>
  );
}
