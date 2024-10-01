"use client";

import { MouseEvent, useState } from "react";
import { downloadFile } from "@/utilities/tools";
import Button from "@/components/client/Button";
import { Download } from "@phosphor-icons/react/dist/ssr";
import Loader from "@/components/Loader";
import { motion } from "framer-motion";

interface ShowcaseDownloadBase {
    id: string;
    name: string;
}

export default function ShowcaseDownload({ ...props }: ShowcaseDownloadBase) {
    const [pending, setPending] = useState<boolean>(false);

    const motions = {
        section: {
            hidden: {
                opacity: 0,
                scale: 0.95,
                transition: {
                    duration: 0.1,
                    ease: "easeIn",
                },
            },
            shown: {
                opacity: 1,
                scale: 1,
                transition: {
                    duration: 0.3,
                    ease: "backOut",
                },
            },
        },
    };

    const handleDownload = async (e: MouseEvent) => {
        e.stopPropagation();
        setPending(true);
        try {
            const res = await fetch(`/api/download?id=${props.id}`, { method: "GET" });
            const blob = await res.blob();
            downloadFile(blob, `${props.name}.icns`);
            setPending(false);
        } catch (error) {
            setPending(false);
        }
    };

    return (
        <motion.section className="download" variants={motions.section}>
            <Button
                type="action"
                colour="primary"
                icon={<Download />}
                text="Download"
                disabled={pending}
                onClick={handleDownload}
            />
            {pending && <Loader />}
        </motion.section>
    );
}
