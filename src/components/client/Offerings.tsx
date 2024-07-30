"use client";

import styles from "@/style/Offerings.module.css";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { useAnimate } from "framer-motion";
import { Offering as WebOffering } from "@/types/web";
import Offering from "@/components/WebOffering";

export default function Offerings({ type, data }: { type: "web" | "design"; data: WebOffering[] }) {
    const overflow = useRef<HTMLDivElement>(null!);
    const [slide, setSlide] = useState(0);
    const [forward, setForward] = useState(true);

    function scroll() {
        const scroll = overflow.current.scrollLeft;
        const offset = overflow.current.offsetWidth;
        const triggers = {
            upper: offset * (slide + 1) - offset / 2,
            lower: slide > 0 ? offset * slide - offset / 2 : 0,
        };
        if (scroll > triggers.upper) {
            !forward && setForward(true);
            setSlide((prevState) => prevState + 1);
        }
        if (scroll > 0 && scroll < triggers.lower) {
            forward && setForward(false);
            setSlide((prevState) => prevState - 1);
        }
    }

    function next() {
        if (slide < data.length - 1) {
            const offset = overflow.current.offsetWidth;
            overflow.current.scroll({
                left: offset * (slide + 1),
                behavior: "smooth",
            });
        }
    }

    function previous() {
        if (slide > 0) {
            const offset = overflow.current.offsetWidth;
            overflow.current.scroll({
                left: offset * (slide - 1),
                behavior: "smooth",
            });
        }
    }

    return (
        <div className={styles.content}>
            <div className={styles.slider}>
                <button className={styles.previous} onClick={previous} disabled={slide < 1}>
                    <ArrowLeft />
                </button>
                <button className={styles.next} onClick={next} disabled={slide >= data.length - 1}>
                    <ArrowRight />
                </button>
                <div className={styles.slides} ref={overflow} onScroll={scroll}>
                    {type === "web" && data.map((i, n) => <Offering key={n} data={i} />)}
                </div>
            </div>
            <Dots data={data} slide={slide} forward={forward} />
        </div>
    );
}

function Dots({ slide, forward, data }: { slide: number; forward: boolean; data: WebOffering[] }) {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        if (forward) {
            animate(
                scope.current,
                { x: [null, null, 16 * slide], width: [null, 24, 8] },
                { duration: 0.4, times: [0, 0.5, 1], ease: [0.83, 0, 0.17, 1] },
            );
        } else {
            animate(
                scope.current,
                { x: [null, 16 * slide, null], width: [null, 24, 8] },
                { duration: 0.4, times: [0, 0.5, 1], ease: [0.83, 0, 0.17, 1] },
            );
        }
    }, [slide, forward, animate, scope]);

    return (
        <div className={styles.dots}>
            <div ref={scope} className={styles.worm} style={{ transform: `translateX(${16 * slide}px)` }} />
            {data.map((i, n) => (
                <div key={n} className={styles.dot} />
            ))}
        </div>
    );
}
