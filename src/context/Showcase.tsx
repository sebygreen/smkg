"use client";

import React, { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { ProjectBranding, ProjectIcon, ProjectInterface, ProjectSite } from "@/utilities/types";

interface ContextBase {
    project: ProjectSite | ProjectIcon | ProjectInterface | ProjectBranding | null;
    setProject: Dispatch<SetStateAction<ProjectSite | ProjectIcon | ProjectInterface | ProjectBranding | null>>;
}

export const ShowcaseContext = createContext<ContextBase>(null!);

export default function ShowcaseProvider({ children }: { children: ReactNode }) {
    const [project, setProject] = useState<ProjectSite | ProjectIcon | ProjectInterface | ProjectBranding | null>(null);

    useEffect(() => {
        if (project) {
            document.documentElement.style.overflow = "hidden";
        } else {
            document.documentElement.removeAttribute("style");
        }
    }, [project]);

    return <ShowcaseContext.Provider value={{ project, setProject }}>{children}</ShowcaseContext.Provider>;
}
