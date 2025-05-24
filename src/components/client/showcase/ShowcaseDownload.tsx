"use client";

import { MouseEvent, useTransition } from "react";
import { downloadFile } from "@/utilities/tools";
import Button from "@/components/client/Button";
import { DownloadIcon } from "@phosphor-icons/react/dist/ssr";
import Loader from "@/components/Loader";
import { motion } from "motion/react";
import { download } from "@/actions/download";
import { useShowcase } from "@/context/Showcase";

interface ShowcaseDownloadBase {
    id: string;
    name: string;
}

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

export default function ShowcaseDownload({ ...props }: ShowcaseDownloadBase) {
    const { project, setProject } = useShowcase();
    const [pending, dispatch] = useTransition();

    const handleDownload = async (e: MouseEvent) => {
        e.stopPropagation();
        dispatch(async () => {
            const res = await download(props.id);
            if (!res.ok) return;
            if (res.ok && res.blob) downloadFile(res.blob, `${props.name}.icns`);
            if (project && "installs" in project) setProject({...project, installs: project.installs + 1})
        });
    };

    return (
        <motion.section className="download" variants={motions.section}>
            <Button
                type="action"
                colour="primary"
                icon={<DownloadIcon />}
                text="Download"
                disabled={pending}
                onClick={handleDownload}
            />
            {pending && <Loader />}
        </motion.section>
    );
}
