"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useAnimate } from "motion/react";
import { clsx } from "clsx";

export default function Header() {
    const paths = useRef([
        { label: "Home", path: "/" },
        { label: "Web", path: "/web" },
        { label: "Design", path: "/design" },
    ]);
    const pathname = usePathname();
    const [header, animate] = useAnimate();
    const worm = useRef<HTMLDivElement>(null);
    const [page, setPage] = useState<number | null>(null);

    const changePage = (target: number) => {
        if (page === null) return;
        if (target === page) return;
        const anchors = header.current!.querySelectorAll("a");
        const anchor = anchors[target];
        const current = anchors[page];
        const middle = {
            target: anchor.offsetLeft + anchor.offsetWidth / 2,
            current: current.offsetLeft + current.offsetWidth / 2,
        };
        const forward = target > page;
        const delta = forward ? middle.target - middle.current : middle.current - middle.target;
        console.log(forward, delta);
        animate(
            ".worm",
            {
                scale: [2, 1, 1, 2],
                width: [2, delta + 2, 2],
                x: middle.target - 2,
            },
            {
                scale: {
                    duration: 0.4,
                },
                width: {
                    delay: 0.1,
                    duration: 0.2,
                },
                x: {
                    delay: forward ? 0.2 : 0.1,
                    duration: 0.1,
                },
                ease: "easeInOut",
            },
        );
        setPage(target);
    };

    useEffect(() => {
        if (page === null) {
            const index = paths.current.map((i) => i.path).indexOf(pathname);
            const anchors = header.current!.querySelectorAll("a");
            const anchor = anchors[index];
            const middle = anchor.offsetLeft + anchor.offsetWidth / 2;
            worm.current!.style.transform = `translateX(${middle - 2}px) scale(2)`;
            setPage(index);
        }
    }, [page, pathname, header]);

    return (
        <header ref={header}>
            <nav>
                {paths.current.map((i, n) => (
                    <Link key={n} href={i.path} onClick={() => changePage(n)}>
                        {i.label}
                    </Link>
                ))}
                <div className="track">
                    <div
                        ref={worm}
                        className={clsx("worm", page !== null && "shown")}
                        style={{ transform: "scale(0)" }}
                    />
                </div>
            </nav>
        </header>
    );
}
