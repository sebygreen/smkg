"use client";

import React, { createContext, ReactNode, useState } from "react";

export const DesignProjectsContext = createContext<any>(null);

export default function DesignProjectsProvider({ children }: { children: ReactNode }) {
    const [shown, setShown] = useState(0);

    return <DesignProjectsContext.Provider value={{ shown, setShown }}>{children}</DesignProjectsContext.Provider>;
}
