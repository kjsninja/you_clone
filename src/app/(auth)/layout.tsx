import React from "react";

interface LayoutParams {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutParams) {
    return (
        <div className="min-h-screen flex items-center justify-center">{children}</div>
    );
}