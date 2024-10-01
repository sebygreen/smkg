"use client";

import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export const StaggerContext = createContext<{ shown: number; setShown: Dispatch<SetStateAction<number>> }>(null!);

export default function StaggerProvider({ children }: { children: ReactNode }) {
    const [shown, setShown] = useState<number>(0);

    return <StaggerContext.Provider value={{ shown, setShown }}>{children}</StaggerContext.Provider>;
}
