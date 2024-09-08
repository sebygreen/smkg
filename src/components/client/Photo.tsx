"use client";

import { useState } from "react";
import styles from "@/style/Photo.module.css";
import Image from "next/image";
import Loader from "@/components/Loader";

export default function Photo({
    url,
    alt,
    width,
    height,
    className,
}: {
    url: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
}) {
    const [loading, setLoading] = useState<boolean>(true);

    const handleLoad = () => {
        setLoading(false);
    };

    return (
        <figure className={`${styles.container} ${className}`}>
            <Image
                style={{ opacity: loading ? 0 : 1 }}
                onLoad={handleLoad}
                src={url}
                alt={alt}
                width={width}
                height={height}
                quality={95}
            />
            {loading && (
                <div className={styles.loading}>
                    <Loader />
                </div>
            )}
        </figure>
    );
}
