import React from "react";

interface LayoutProps {
    children: React.ReactNode
}
export default function Layout({ children }: LayoutProps) {
    return (
        <div>
            <div className="p-4 bg-rose-500 w-full">I am navbar</div>
            {children}
        </div>
    );
}