import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Satoshi } from "@/utilities/fonts";
import Fluid from "@/components/client/Fluid";
import Header from "@/components/client/Header";
import PlausibleProvider from "next-plausible";

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
    icons: {
        icon: "/favicon.svg",
    },
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    appleWebApp: {
        title: "smkg.me",
    },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en">
            <body className={Satoshi.className}>
                <PlausibleProvider
                    domain="smkg.me"
                    customDomain="https://plausible.smkg.me"
                    selfHosted
                    trackOutboundLinks
                >
                    <Header />
                    <Fluid />
                    {children}
                </PlausibleProvider>
            </body>
        </html>
    );
}
