import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";

import localFont from "next/font/local";
import Header from "@/components/client/Header";

const satoshi = localFont({
    src: [
        {
            path: "../assets/fonts/Satoshi[wght].ttf",
            style: "normal",
            weight: "100 900",
        },
        {
            path: "../assets/fonts/Satoshi-Italic[wght].ttf",
            style: "italic",
            weight: "100 900",
        },
    ],
});

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
            <body className={satoshi.className}>
                <Header />
                {children}
            </body>
        </html>
    );
}
