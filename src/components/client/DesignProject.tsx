"use client";

import styles from "@/style/DesignProject.module.css";
import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/types/design";
import { filenameToSize } from "@/utilities/helpers";
import { useContext } from "react";
import { DesignProjectsContext } from "@/context/DesignProjects";
import { ShowcaseContext } from "@/context/Showcase";

export default function DesignProject({ data, index }: { data: Project; index: number }) {
    const { shown, setShown } = useContext(DesignProjectsContext);
    const { setShowcase } = useContext(ShowcaseContext);

    const motions = {
        hidden: {
            scale: 0.95,
            opacity: 0,
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                delay: (index - shown) * 0.1,
                duration: 0.3,
                ease: [0.83, 0, 0.17, 1],
            },
        },
    };

    let photo = {
        url: `${process.env.NEXT_PUBLIC_DB_FILES}/${data.collectionId}/${data.id}/${data.preview}`,
        ...filenameToSize(data.preview),
    };

    return (
        <motion.article
            className={`${styles[data.type.toLowerCase()]} ${photo.height === photo.width ? styles.square : undefined}`}
            variants={motions}
            initial="hidden"
            whileInView="visible"
            onAnimationComplete={() => {
                setShown((prev: number) => prev + 1);
            }}
            viewport={{
                once: true,
                amount: 0.25,
            }}
            onClick={() => setShowcase(data)}
        >
            <Image src={photo.url} alt="Image of the design project." width={photo.width} height={photo.height} />
        </motion.article>
    );
}
