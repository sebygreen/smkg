"use client";

import { useContext } from "react";
import { ShowcaseContext } from "@/context/Showcase";
import { ProjectBranding, ProjectIcon, ProjectInterface } from "@/utilities/types";
import Thumbnail from "@/components/client/Thumbnail";
import { StaggerContext } from "@/context/Stagger";
import { motion } from "framer-motion";
import { Download } from "@phosphor-icons/react/dist/ssr";

interface DesignProjectBase {
    data: ProjectIcon | ProjectInterface | ProjectBranding;
    index: number;
}

export default function DesignProject({ ...props }: DesignProjectBase) {
    const { setProject } = useContext(ShowcaseContext);
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
                    delay: (props.index - shown) * 0.05,
                    duration: 0.3,
                    ease: "backOut",
                },
            },
        },
    };

    return (
        <motion.article
            className={`project design ${props.data.type}`}
            onClick={() => setProject(props.data)}
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
            <Thumbnail
                url={props.data.preview.url}
                alt={`Preview of ${props.data.name}.`}
                width={props.data.preview.width}
                height={props.data.preview.height}
            />
            {"installs" in props.data && (
                <div className="installs">
                    <Download />
                    <p>{props.data.installs}</p>
                </div>
            )}
        </motion.article>
    );
}
