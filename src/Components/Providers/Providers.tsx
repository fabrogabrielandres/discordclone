'use client';

import { ClerkProvider } from "@clerk/nextjs";
import { QueryProvider } from "./QueryProviders";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>

            <ClerkProvider>
                <QueryProvider>
                    {children}
                </QueryProvider>
            </ClerkProvider>
        </>
    );
}