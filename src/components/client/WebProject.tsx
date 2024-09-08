"use client";

import { useContext } from "react";
import { motion } from "framer-motion";
import styles from "@/style/WebProject.module.css";
import { ArrowSquareOut, TrafficCone } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/Button";
import { StaggerContext } from "@/context/Stagger";
import { SiteSchema } from "@/utilities/types";
import Photo from "@/components/client/Photo";
import { Eye, Package } from "@phosphor-icons/react";
import { ViewerContext } from "@/context/Viewer";

export default function WebProject({ data, index }: { data: SiteSchema; index: number }) {
    const { shown, setShown } = useContext(StaggerContext);
    const { setProject } = useContext(ViewerContext);
    const motions = {
        project: {
            hidden: {
                scale: 0.9,
                opacity: 0,
            },
            shown: {
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
            className={styles.container}
            variants={motions.project}
            initial="hidden"
            whileInView="shown"
            onAnimationComplete={() => {
                setShown((previous: number) => previous + 1);
            }}
            viewport={{
                once: true,
                amount: 0.5,
            }}
        >
            <div className={styles.thumbnail}>
                <Photo
                    url={data.preview.url}
                    alt="Screenshot of the website."
                    width={data.preview.width}
                    height={data.preview.height}
                />
                {data.archived && (
                    <div className={styles.status}>
                        <p>Archived</p>
                        <Package weight="fill" />
                    </div>
                )}
                {data.building && (
                    <div className={styles.status}>
                        <p>Building</p>
                        <TrafficCone weight="fill" />
                    </div>
                )}
            </div>
            <h3>{data.name}</h3>
            <div className={styles.actions}>
                <Button type="button" text="View" icon={<Eye />} onClick={() => setProject(data)} />
                {data.url && <Button type="anchor" text="Visit" icon={<ArrowSquareOut />} href={data.url} />}
            </div>
        </motion.article>
    );
}
