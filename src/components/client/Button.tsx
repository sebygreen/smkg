"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { MouseEvent } from "react";

interface ButtonBase {
    colour: "primary" | "secondary";
    icon: ReactNode;
    text?: string;
    disabled?: boolean;
    className?: string;
}

interface ButtonAction extends ButtonBase {
    type: "action";
    onClick: (e: MouseEvent) => void | Promise<void>;
}

interface ButtonAnchor extends ButtonBase {
    type: "anchor";
    href: string;
}

interface ButtonRoute extends ButtonBase {
    type: "route";
    href: string;
}

export default function Button({ ...props }: ButtonAction | ButtonAnchor | ButtonRoute) {
    const classGenerator = () => {
        let initial = ["button", props.type, props.colour];
        props.className && initial.push(props.className);
        props.disabled && initial.push("disabled");
        props.text ? initial.push("full") : initial.push("icon");
        return initial.join(" ");
    };
    switch (props.type) {
        case "action":
            return (
                <button className={classGenerator()} onClick={props.onClick}>
                    {props.text && props.text}
                    {props.icon}
                </button>
            );
        case "anchor":
            return (
                <a className={classGenerator()} href={props.href} target="_blank">
                    {props.text && props.text}
                    {props.icon}
                </a>
            );
        case "route":
            return (
                <Link className={classGenerator()} href={props.href}>
                    {props.text && props.text}
                    {props.icon}
                </Link>
            );
    }
}
