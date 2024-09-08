"use client";

import styles from "@/style/Button.module.css";
import { ReactNode } from "react";
import Link from "next/link";

interface ButtonSchema {
    type: "button" | "anchor" | "route";
    icon: ReactNode;
    text?: string;
    light?: boolean;
    blur?: boolean;
    disabled?: boolean;
    href?: string;
    onClick?: any;
    className?: string;
}

export default function Button({ type, light, blur, disabled, text, icon, href, onClick, className }: ButtonSchema) {
    let variant: string[] = [styles.button];
    if (text) {
        variant.push(styles.full);
    } else {
        variant.push(styles.icon);
    }
    if (light) {
        variant.push(styles.light);
    }
    if (blur) {
        variant.push(styles.blur);
    }
    if (disabled) {
        variant.push(styles.disabled);
    }
    if (className) {
        variant.push(className);
    }
    return type === "button" ? (
        <button className={variant.join(" ")} onClick={onClick}>
            {!!text && text}
            {icon}
        </button>
    ) : type === "anchor" ? (
        <a className={variant.join(" ")} href={href!} target="_blank">
            {!!text && text}
            {icon}
        </a>
    ) : (
        <Link className={variant.join(" ")} href={href!}>
            {!!text && text}
            {icon}
        </Link>
    );
}
