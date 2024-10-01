"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useAnimate } from "framer-motion";
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

    const motions = {
        right: (middle: { current: number; target: number }) => {
            const delta = middle.target - middle.current;
            animate(
                ".worm",
                {
                    height: [4, 1, 1, 4],
                    width: [4, delta + 4, 4],
                    left: middle.target - 2,
                },
                {
                    onComplete: () => console.log("right animation complete"),
                    height: {
                        duration: 0.4,
                    },
                    width: {
                        delay: 0.1,
                        duration: 0.2,
                    },
                    left: {
                        delay: 0.2,
                        duration: 0.1,
                    },
                },
            );
        },
        left: (middle: { current: number; target: number }) => {
            const delta = middle.current - middle.target;
            animate(
                ".worm",
                {
                    height: [4, 1, 1, 4],
                    width: [4, delta + 4, 4],
                    left: middle.target - 2,
                },
                {
                    onComplete: () => console.log("left animation complete"),
                    height: {
                        duration: 0.4,
                    },
                    width: {
                        delay: 0.1,
                        duration: 0.2,
                    },
                    left: {
                        delay: 0.1,
                        duration: 0.1,
                    },
                },
            );
        },
    };

    useEffect(() => {
        if (page === null) {
            const index = paths.current.map((i) => i.path).indexOf(pathname);
            const anchors = header.current!.querySelectorAll("a");
            const anchor = anchors[index];
            const middle = anchor.offsetLeft + anchor.offsetWidth / 2;
            worm.current!.style.left = `${middle - 2}px`;
            setPage(index);
        }
    }, [page, pathname, header]);

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
        if (target < page) motions.left(middle);
        if (target > page) motions.right(middle);
        setPage(target);
    };

    return (
        <header ref={header}>
            <nav>
                {paths.current.map((i, n) => (
                    <Link key={n} href={i.path} onClick={() => changePage(n)}>
                        {i.label}
                    </Link>
                ))}
                <div className="track">
                    <div ref={worm} className={clsx("worm", page !== null && "shown")} style={{ width: "4px" }} />
                </div>
            </nav>
        </header>
    );
}
