import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { HomeNavBar } from "../components/home-navbar";
import { HomeSidebar } from "../components/home-sidebar";

interface HomeLayoutParams {
  children: React.ReactNode
}

export const HomeLayout = ({ children }: HomeLayoutParams) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <HomeNavBar />
        <div className="flex min-h-screen pt-[4rem]">
          <HomeSidebar />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}