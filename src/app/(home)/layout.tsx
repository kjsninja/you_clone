import React from "react";
import { HomeLayout } from '@/modules/home/ui/layouts/home-layout';

interface LayoutParams {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutParams) {
    return (
        <HomeLayout>{children}</HomeLayout>
    );
}