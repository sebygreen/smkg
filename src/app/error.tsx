"use client";

import { useEffect } from "react";
import { ArrowsClockwise, SmileySad } from "@phosphor-icons/react/dist/ssr";
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
            <SmileySad weight="fill" />
            <p>An unexpected error has occurred.</p>
            <Button type="action" colour="primary" icon={<ArrowsClockwise />} text="Refresh" onClick={() => reset()} />
        </main>
    );
}
