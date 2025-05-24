"use client";

import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface ContextParams {
    open: boolean;
    toggle: () => void;
}

export const CreditsContext = createContext<ContextParams>({
    open: false,
    toggle: () => null,
});

export function useCredits() {
    const value = useContext(CreditsContext);
    if (process.env.NODE_ENV !== "production") {
        if (!value) throw new Error("useToast must be wrapped in a <CreditsProvider />");
    }
    return value;
}

export default function CreditsProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (open) {
            document.documentElement.style.overflow = "hidden";
        } else {
            document.documentElement.removeAttribute("style");
        }
    }, [open]);

    return <CreditsContext.Provider value={{ open, toggle: () => setOpen(!open) }}>{children}</CreditsContext.Provider>;
}
