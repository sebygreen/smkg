"use client";

import { useEffect } from "react";
import { ArrowsClockwise, SmileySad } from "@phosphor-icons/react/dist/ssr";
import styles from "@/style/Error.module.css";
import Button from "@/components/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className={styles.container}>
            <SmileySad weight="fill" />
            <p>An unexpected error has occurred.</p>
            <Button type="button" icon={<ArrowsClockwise />} text="Refresh" onClick={() => reset()} />
        </div>
    );
}
