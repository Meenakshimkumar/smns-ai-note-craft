
import React from "react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {!isMobile && <Sidebar />}
      <div className="flex-1 flex flex-col">
        {isMobile && <MobileNav />}
        <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};
