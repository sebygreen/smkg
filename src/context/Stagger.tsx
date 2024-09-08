"use client";

import React, { createContext, ReactNode, useState } from "react";

export const StaggerContext = createContext<any>(null);

export default function StaggerProvider({ children }: { children: ReactNode }) {
    const [shown, setShown] = useState<number>(0);

    return <StaggerContext.Provider value={{ shown, setShown }}>{children}</StaggerContext.Provider>;
}
