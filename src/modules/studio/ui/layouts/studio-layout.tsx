import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { StudioNavBar } from "../components/studio-navbar";
import { StudioSidebar } from "../components/studio-sidebar";

interface StudioLayoutParams {
  children: React.ReactNode
}

export const StudioLayout = ({ children }: StudioLayoutParams) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <StudioNavBar />
        <div className="flex min-h-screen pt-[4rem]">
          <StudioSidebar />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}