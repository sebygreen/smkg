"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MouseEvent, useContext, useState } from "react";
import { ViewerContext } from "@/context/Viewer";
import styles from "@/style/Viewer.module.css";
import Loader from "@/components/Loader";
import Image from "next/image";
import { CalendarBlank, Tag } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/Button";
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";

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
    figure: {
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
    name: {
        hidden: {
            opacity: 0,
            x: -5,
            transition: {
                duration: 0.3,
                ease: "easeIn",
            },
        },
        shown: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
                ease: "backOut",
            },
        },
    },
    tag: {
        hidden: {
            opacity: 0,
            x: -5,
            transition: {
                duration: 0.3,
                ease: "easeIn",
            },
        },
        shown: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
                ease: "backOut",
            },
        },
    },
    close: {
        hidden: {
            opacity: 0,
            x: 5,
            transition: {
                duration: 0.3,
                ease: "easeIn",
            },
        },
        shown: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
                ease: "backOut",
            },
        },
    },
};

export function Viewer() {
    const { project, setProject } = useContext(ViewerContext);
    const [loading, setLoading] = useState<boolean>(true);

    function handleBubble(e: MouseEvent) {
        e.stopPropagation();
    }

    async function handleClose() {
        setProject(null);
        setLoading(true);
    }

    function handleLoad() {
        setLoading(false);
    }

    return (
        <AnimatePresence>
            {project && (
                <motion.section
                    id="viewer"
                    className={`${styles.container} ${loading ? undefined : styles.loaded}`}
                    onClick={handleClose}
                    variants={motions.container}
                    initial="hidden"
                    animate="shown"
                    exit="hidden"
                >
                    <div className={styles.wrapper}>
                        <div className={styles.heading}>
                            <div>
                                <motion.h2 variants={motions.name}>{project.name}</motion.h2>
                                <div className={styles.tags}>
                                    <motion.div variants={motions.tag} className={styles.tag}>
                                        <Tag />
                                        <p>{project.industry}</p>
                                    </motion.div>
                                    <motion.div variants={motions.tag} className={styles.tag}>
                                        <CalendarBlank />
                                        <p>{project.year}</p>
                                    </motion.div>
                                </div>
                            </div>
                            <motion.div variants={motions.close}>
                                <Button
                                    className={styles.close}
                                    type="button"
                                    icon={<CloseIcon />}
                                    onClick={handleClose}
                                />
                            </motion.div>
                        </div>
                        <motion.figure onClick={handleBubble} variants={motions.figure}>
                            {loading && <Loader className={styles.loader} />}
                            <Image
                                src={project.image.url}
                                alt={`Screenshot for ${project.name}.`}
                                width={project.image.width}
                                height={project.image.height}
                                onLoad={handleLoad}
                            />
                        </motion.figure>
                    </div>
                </motion.section>
            )}
        </AnimatePresence>
    );
}
