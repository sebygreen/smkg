"use client";

import React, { createContext, ReactNode, useEffect, useState } from "react";
import { BrandingSchema, IconSchema, InterfaceSchema } from "@/utilities/types";

export const ShowcaseContext = createContext<any>(null);

export default function ShowcaseProvider({ children }: { children: ReactNode }) {
    const [showcase, setShowcase] = useState<IconSchema | InterfaceSchema | BrandingSchema | null>(null);

    useEffect(() => {
        if (showcase) {
            document.documentElement.style.overflow = "hidden";
        } else {
            document.documentElement.removeAttribute("style");
        }
    }, [showcase]);

    return <ShowcaseContext.Provider value={{ showcase, setShowcase }}>{children}</ShowcaseContext.Provider>;
}
