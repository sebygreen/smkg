"use client";

import { useContext } from "react";
import { ShowcaseContext } from "@/context/Showcase";
import { AnimatePresence, motion } from "framer-motion";
import styles from "@/style/Showcase.module.css";
import Image from "next/image";
import { Photo } from "@/types/design";
import { filenameToSize } from "@/utilities/helpers";

export default function Showcase() {
    const { showcase, setShowcase } = useContext(ShowcaseContext);

    function handleClose() {
        setShowcase(false);
    }

    const variants = {
        blur: {
            hidden: {
                opacity: 0,
                transition: {
                    delay: 0.2,
                    duration: 0.3,
                },
            },
            shown: {
                opacity: 1,
                transition: {
                    duration: 0.3,
                },
            },
        },
        children: {
            shown: {
                transition: {
                    delayChildren: 0.3,
                    staggerChildren: 0.1,
                },
            },
        },
        title: {
            hidden: {
                opacity: 0,
                y: -10,
                transition: {
                    duration: 0.3,
                },
            },
            shown: {
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.3,
                    ease: "easeOut",
                },
            },
        },
    };

    let preview: Photo | null =
        showcase && showcase.preview
            ? {
                  url: `${process.env.NEXT_PUBLIC_DB_FILES}/${showcase.collectionId}/${showcase.id}/${showcase.preview}`,
                  ...filenameToSize(showcase.preview),
              }
            : null;

    let photos: Photo[] | null =
        showcase && showcase.photos.length > 0
            ? showcase.photos.map((i: string) => ({
                  url: `${process.env.NEXT_PUBLIC_DB_FILES}/${showcase.collectionId}/${showcase.id}/${i}`,
                  ...filenameToSize(i),
              }))
            : null;

    return (
        <AnimatePresence>
            {!!showcase && (
                <section id="showcase" className={styles.showcase} onClick={handleClose}>
                    <motion.div
                        className={styles.backdrop}
                        variants={variants.blur}
                        initial="hidden"
                        animate="shown"
                        exit="hidden"
                    />
                    <div className={styles.wrapper}>
                        <motion.div
                            className={styles.heading}
                            variants={variants.children}
                            initial="hidden"
                            animate="shown"
                            exit="hidden"
                        >
                            <motion.h2 variants={variants.title}>{showcase.name}</motion.h2>
                            <motion.p variants={variants.title}>{showcase.year}</motion.p>
                        </motion.div>
                        <motion.div
                            className={styles.photos}
                            variants={variants.children}
                            initial="hidden"
                            animate="shown"
                            exit="hidden"
                        >
                            {showcase &&
                                showcase.type === "Logo" &&
                                photos &&
                                photos.map((i: Photo, n: number) => <Display key={n} photo={i} type="logo" />)}
                            {showcase &&
                                showcase.type === "Interface" &&
                                photos &&
                                photos.map((i: Photo, n: number) => <Display key={n} photo={i} type="interface" />)}
                            {showcase && showcase.type === "Icon" && preview && <Display photo={preview} type="icon" />}
                        </motion.div>
                    </div>
                </section>
            )}
        </AnimatePresence>
    );
}

function Display({ photo, type }: { photo: Photo; type: "logo" | "interface" | "icon" }) {
    const variants = {
        hidden: {
            opacity: 0,
            scale: 0.95,
            transition: {
                duration: 0.3,
            },
        },
        shown: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
        },
    };

    function handleBubble(e: any) {
        e.stopPropagation();
    }

    return (
        <motion.div className={styles[type]} variants={variants} onClick={handleBubble}>
            <Image
                src={photo.url}
                alt="Showcase image for the selected project."
                width={photo.width}
                height={photo.height}
            />
        </motion.div>
    );
}
