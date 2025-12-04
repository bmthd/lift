import type { Metadata } from "next";
import { Header, HeaderActionProvider } from "./components/header";
import "./globals.css";
import type { PropsWithChildren } from "react";
import { Footer } from "./components/footer";
import { FooterContentProvider } from "./components/footer/footer";
import { Sidebar } from "./components/sidebar";
import { SidebarContentProvider } from "./components/sidebar/sidebar";

export const metadata: Metadata = {
  title: "createHoistableComponent Demo",
  description: "Demo of createHoistableComponent from lift library",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 p-6">{children}</main>
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
    <HeaderActionProvider>
      <SidebarContentProvider>
        <FooterContentProvider>{children}</FooterContentProvider>
      </SidebarContentProvider>
    </HeaderActionProvider>
  );
};
