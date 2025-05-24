"use client";

import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface ContextParams {
    shown: number;
    setShown: Dispatch<SetStateAction<number>>;
}

export const StaggerContext = createContext<ContextParams>({
    shown: 0,
    setShown: () => null,
});

export function useStagger() {
    const value = useContext(StaggerContext);
    if (process.env.NODE_ENV !== "production") {
        if (!value) throw new Error("useToast must be wrapped in a <StaggerProvider />");
    }
    return value;
}

export default function StaggerProvider({ children }: { children: ReactNode }) {
    const [shown, setShown] = useState<number>(0);
    return <StaggerContext.Provider value={{ shown, setShown }}>{children}</StaggerContext.Provider>;
}
