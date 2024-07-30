"use client";

import React, { createContext, ReactNode, useState } from "react";

export const WebProjectsContext = createContext<any>(null);

export default function WebProjectsProvider({ children }: { children: ReactNode }) {
    const [shown, setShown] = useState(0);
    return <WebProjectsContext.Provider value={{ shown, setShown }}>{children}</WebProjectsContext.Provider>;
}
