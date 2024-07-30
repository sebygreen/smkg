import { Project } from "@/types/web";
import { useContext } from "react";
import { WebProjectsContext } from "@/context/WebProjects";
import { filenameToSize } from "@/utilities/helpers";
import { motion } from "framer-motion";
import styles from "@/style/WebProject.module.css";
import { Archive, ArrowSquareOut, CalendarBlank, Tag, TrafficCone } from "@phosphor-icons/react";
import Image from "next/image";
import Button from "@/components/Button";

export default function WebProject({ data, index }: { data: Project; index: number }) {
    const { shown, setShown } = useContext(WebProjectsContext);

    const motions = {
        start: {
            scale: 0.95,
            opacity: 0,
        },
        enter: {
            scale: 1,
            opacity: 1,
            transition: {
                delay: (index - shown) * 0.1,
                duration: 0.4,
                ease: [0.83, 0, 0.17, 1],
            },
        },
    };

    let screenshot = {
        url: `${process.env.NEXT_PUBLIC_DB_FILES}/${data.collectionId}/${data.id}/${data.screenshot}`,
        ...filenameToSize(data.screenshot),
    };

    return (
        <motion.article
            className={styles.project}
            variants={motions}
            initial="start"
            whileInView="enter"
            onAnimationComplete={() => {
                setShown((prev: number) => prev + 1);
            }}
            viewport={{
                once: true,
                amount: 0.3,
            }}
        >
            <div className={styles.thumbnail}>
                {data.archived && (
                    <div className={styles.status}>
                        <p>Archived</p>
                        <Archive weight="fill" />
                    </div>
                )}
                {data.building && (
                    <div className={styles.status}>
                        <p>Building</p>
                        <TrafficCone weight="fill" />
                    </div>
                )}
                <Image
                    src={screenshot.url}
                    alt="Screenshot of the website."
                    width={screenshot.width}
                    height={screenshot.height}
                />
            </div>
            <h3>{data.name}</h3>
            {data.link && <Button type="anchor" text={data.link} icon={<ArrowSquareOut />} href={data.link} />}
            <div className={styles.metadata}>
                <div className={styles.industry}>
                    <Tag />
                    <p>{data.industry}</p>
                </div>
                <div className={styles.year}>
                    <CalendarBlank />
                    <p>{data.year}</p>
                </div>
            </div>
        </motion.article>
    );
}
