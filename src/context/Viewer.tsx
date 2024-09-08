"use client";

import React, { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { SiteSchema } from "@/utilities/types";

export const ViewerContext = createContext<{
    project: SiteSchema | null;
    setProject: Dispatch<SetStateAction<SiteSchema | null>>;
}>({
    project: null,
    setProject: () => {},
});

export default function ViewerProvider({ children }: { children: ReactNode }) {
    const [project, setProject] = useState<SiteSchema | null>(null);

    useEffect(() => {
        if (project) {
            document.documentElement.style.overflow = "hidden";
        } else {
            document.documentElement.removeAttribute("style");
        }
    }, [project]);

    return <ViewerContext.Provider value={{ project, setProject }}>{children}</ViewerContext.Provider>;
}
