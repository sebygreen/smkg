import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Script from "next/script";
import { Satoshi } from "@/utilities/fonts";
import Fluid from "@/components/client/Fluid";
import Header from "@/components/client/Header";

export const metadata: Metadata = {
    title: {
        template: "Sebastien Green • %s",
        default: "Sebastien Green",
    },
    description: "Web developer & designer.",
    generator: "Next.js",
    applicationName: "smkg.me",
    authors: [{ name: "Sebastien Green", url: "https://smkg.me" }],
    referrer: "origin-when-cross-origin",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={Satoshi.className}>
                <Header />
                <Fluid />
                {children}
            </body>
            <Script defer data-domain="smkg.me" src={"https://plausible.smkg.me/js/script.js"} />
        </html>
    );
}
