"use client";

import { useState } from "react";
import Image from "next/image";
import Loader from "@/components/Loader";

interface ThumbnailBase {
    url: string;
    alt: string;
    width: number;
    height: number;
}

export default function Thumbnail({ ...props }: ThumbnailBase) {
    const [loading, setLoading] = useState<boolean>(true);

    return (
        <figure className="image">
            <Image
                style={{ opacity: loading ? 0 : 1 }}
                onLoad={() => setLoading(false)}
                src={props.url}
                alt={props.alt}
                width={props.width}
                height={props.height}
                quality={95}
            />
            {loading && <Loader />}
        </figure>
    );
}
