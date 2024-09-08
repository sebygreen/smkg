"use client";

import { MouseEvent, useContext, useState } from "react";
import { ShowcaseContext } from "@/context/Showcase";
import { AnimatePresence, motion } from "framer-motion";
import styles from "@/style/Showcase.module.css";
import { IconSchema, ImageSchema } from "@/utilities/types";
import Button from "@/components/Button";
import { Download } from "@phosphor-icons/react/dist/ssr";
import Loader from "@/components/Loader";
import Photo from "@/components/client/Photo";
import { downloadFile } from "@/utilities/tools";

const motions = {
    container: {
        hidden: {
            opacity: 0,
            transition: {
                duration: 0.3,
                ease: "linear",
                when: "afterChildren",
            },
        },
        shown: {
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: "linear",
                when: "beforeChildren",
                staggerChildren: 0.05,
            },
        },
    },
    name: {
        hidden: {
            opacity: 0,
            y: -10,
            transition: {
                duration: 0.3,
                ease: "easeIn",
            },
        },
        shown: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "backOut",
            },
        },
    },
    year: {
        hidden: {
            opacity: 0,
            y: -10,
            transition: {
                duration: 0.3,
                ease: "easeIn",
            },
        },
        shown: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "backOut",
            },
        },
    },
    figure: {
        hidden: {
            opacity: 0,
            scale: 0.95,
            transition: {
                duration: 0.3,
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
    download: {
        hidden: {
            opacity: 0,
            y: 10,
            transition: {
                duration: 0.3,
                ease: "easeIn",
            },
        },
        shown: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "backOut",
            },
        },
    },
};

export default function Showcase() {
    const { showcase, setShowcase } = useContext(ShowcaseContext);

    function handleBubble(e: MouseEvent) {
        e.stopPropagation();
    }

    function handleClose() {
        setShowcase(null);
    }

    return (
        <AnimatePresence>
            {showcase && (
                <motion.section
                    id="showcase"
                    className={styles.showcase}
                    onClick={handleClose}
                    variants={motions.container}
                    initial="hidden"
                    animate="shown"
                    exit="hidden"
                >
                    <div className={styles.wrapper}>
                        <div className={styles.heading}>
                            <motion.h2 variants={motions.name}>{showcase.name}</motion.h2>
                            <motion.p variants={motions.year}>{showcase.year}</motion.p>
                        </div>
                        <div className={styles.photos}>
                            {showcase.images.map((i: ImageSchema, n: number) => (
                                <motion.div
                                    key={n}
                                    className={styles[showcase.type]}
                                    variants={motions.figure}
                                    onClick={handleBubble}
                                >
                                    <Photo
                                        url={i.url}
                                        alt={`Showcase image for ${showcase.name}.`}
                                        width={i.width}
                                        height={i.height}
                                    />
                                </motion.div>
                            ))}
                        </div>
                        {showcase.download && <DownloadProject project={showcase} />}
                    </div>
                </motion.section>
            )}
        </AnimatePresence>
    );
}

function DownloadProject({ project }: { project: IconSchema }) {
    const [pending, setPending] = useState<boolean>(false);

    const handleDownload = async (e: MouseEvent) => {
        e.stopPropagation();
        setPending(true);
        try {
            const res = await fetch(`/api/download?id=${project.id}`, { method: "GET" });
            const blob = await res.blob();
            downloadFile(blob, `${project.name}.icns`);
            setPending(false);
        } catch (error) {
            //send error to toast
            setPending(false);
        }
    };

    return (
        <motion.div className={styles.download} variants={motions.download}>
            <Button type="button" icon={<Download />} text="Download" onClick={handleDownload} disabled={pending} />
            {pending && <Loader className={styles.loader} />}
        </motion.div>
    );
}
