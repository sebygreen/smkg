"use client";

import styles from "@/style/Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    return (
        <header className={styles.header}>
            <nav>
                <Link className={pathname === "/" ? styles.active : undefined} href={"/"}>
                    Home
                </Link>
                <Link className={pathname === "/web" ? styles.active : undefined} href={"/web"}>
                    Web
                </Link>
                <Link className={pathname === "/design" ? styles.active : undefined} href={"/design"}>
                    Design
                </Link>
            </nav>
        </header>
    );
}
