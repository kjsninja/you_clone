import React from "react";
import { StudioLayout } from '@/modules/studio/ui/layouts/studio-layout';

interface LayoutParams {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutParams) {
    return (
        <StudioLayout>{children}</StudioLayout>
    );
}