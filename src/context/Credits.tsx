"use client";

import React, { createContext, ReactNode, useEffect, useState } from "react";

export const CreditsContext = createContext<any>(null);

export default function CreditsProvider({ children }: { children: ReactNode }) {
    const [credits, setCredits] = useState<boolean>(false);

    useEffect(() => {
        if (credits) {
            document.documentElement.style.overflow = "hidden";
        } else {
            document.documentElement.removeAttribute("style");
        }
    }, [credits]);

    return <CreditsContext.Provider value={{ credits, setCredits }}>{children}</CreditsContext.Provider>;
}
