"use client";

import { useRef, useState } from "react";
import { clsx } from "clsx";
import Loader from "@/components/Loader";
import Image from "next/image";
import { MouseScroll } from "@phosphor-icons/react/dist/ssr";

interface SlideBase {
    src: string;
    alt: string;
    width: number;
    height: number;
}

export default function Slide({ ...props }: SlideBase) {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [scrollable, setScrollable] = useState<boolean>(false);
    const figure = useRef<HTMLElement>(null);

    if (figure.current && loaded && !scrollable && figure.current.clientHeight < figure.current.scrollHeight) {
        setScrollable(true);
    }

    return (
        <div className={clsx("slide", loaded && "loaded")}>
            {scrollable && (
                <div className="scrollable">
                    <MouseScroll />
                </div>
            )}
            {!loaded && <Loader />}
            <figure ref={figure}>
                <div className="overflow">
                    <Image
                        src={props.src}
                        alt={props.alt}
                        width={props.width}
                        height={props.height}
                        onLoad={() => setLoaded(true)}
                    />
                </div>
            </figure>
        </div>
    );
}
