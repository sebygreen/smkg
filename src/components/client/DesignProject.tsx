"use client";

import styles from "@/style/DesignProject.module.css";
import { useContext } from "react";
import { ShowcaseContext } from "@/context/Showcase";
import { BrandingSchema, IconSchema, InterfaceSchema } from "@/utilities/types";
import Photo from "@/components/client/Photo";
import { StaggerContext } from "@/context/Stagger";
import { motion } from "framer-motion";
import { Download } from "@phosphor-icons/react/dist/ssr";

export default function DesignProject({
    data,
    index,
}: {
    data: IconSchema | InterfaceSchema | BrandingSchema;
    index: number;
}) {
    const { setShowcase } = useContext(ShowcaseContext);
    const { shown, setShown } = useContext(StaggerContext);
    const motions = {
        project: {
            hidden: {
                scale: 0.9,
                opacity: 0,
            },
            visible: {
                scale: 1,
                opacity: 1,
                transition: {
                    delay: (index - shown) * 0.05,
                    duration: 0.3,
                    ease: "backOut",
                },
            },
        },
    };

    return (
        <motion.article
            className={`${styles.container} ${styles[data.type]}`}
            onClick={() => setShowcase(data)}
            variants={motions.project}
            initial="hidden"
            whileInView="visible"
            onAnimationComplete={() => {
                setShown((previous: number) => previous + 1);
            }}
            viewport={{
                once: true,
                amount: 0.5,
            }}
        >
            <div className={styles.image}>
                <Photo
                    url={data.preview.url}
                    alt={`Preview of ${data.name}.`}
                    width={data.preview.width}
                    height={data.preview.height}
                />
            </div>
            {data.type === "icon" && (
                <div className={styles.installs}>
                    <Download />
                    <p>{data.installs}</p>
                </div>
            )}
        </motion.article>
    );
}
