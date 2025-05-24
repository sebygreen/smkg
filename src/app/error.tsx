"use client";

import { useEffect } from "react";
import { ArrowsClockwiseIcon, SmileySadIcon } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/client/Button";

interface ErrorBase {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorBase) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main id="error">
            <SmileySadIcon weight="fill" />
            <p>An unexpected error has occurred.</p>
            <Button type="action" colour="primary" icon={<ArrowsClockwiseIcon />} text="Refresh" onClick={() => reset()} />
        </main>
    );
}
