"use client";

import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ProjectBranding, ProjectIcon, ProjectInterface, ProjectSite } from "@/utilities/types";

type Project = ProjectSite | ProjectIcon | ProjectInterface | ProjectBranding;

interface ContextParams {
    project: Project | null;
    setProject: (project: Project | null) => void;
}

export const ShowcaseContext = createContext<ContextParams>({
    project: null,
    setProject: () => null,
});

export function useShowcase() {
    const value = useContext(ShowcaseContext);
    if (process.env.NODE_ENV !== "production") {
        if (!value) throw new Error("useToast must be wrapped in a <ShowcaseProvider />");
    }
    return value;
}

export default function ShowcaseProvider({ children }: { children: ReactNode }) {
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        if (project) {
            document.documentElement.style.overflow = "hidden";
        } else {
            document.documentElement.removeAttribute("style");
        }
    }, [project]);

    return (
        <ShowcaseContext.Provider value={{ project, setProject: (project) => setProject(project) }}>
            {children}
        </ShowcaseContext.Provider>
    );
}
