import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import Header from "@/components/client/Header";
import Script from "next/script";
import { Satoshi } from "@/utilities/fonts";

export const metadata: Metadata = {
    title: "Sebastien Green",
    description: "Web Developer & Designer",
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
                {children}
            </body>
            <Script defer data-domain="smkg.me" src={"https://plausible.smkg.me/js/script.js"} />
        </html>
    );
}
