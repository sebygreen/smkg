"use client";

import { useContext } from "react";
import { motion } from "framer-motion";
import { ArrowSquareOut, TrafficCone } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/client/Button";
import { StaggerContext } from "@/context/Stagger";
import { ProjectSite } from "@/utilities/types";
import Thumbnail from "@/components/client/Thumbnail";
import { Eye, Package } from "@phosphor-icons/react";
import { ShowcaseContext } from "@/context/Showcase";

interface WebProjectBase {
    data: ProjectSite;
    index: number;
}

export default function WebProject({ ...props }: WebProjectBase) {
    const { shown, setShown } = useContext(StaggerContext);
    const { setProject } = useContext(ShowcaseContext);

    return (
        <motion.article
            className="project site"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{
                delay: (props.index - shown) * 0.05,
                duration: 0.3,
                ease: "backOut",
            }}
            onAnimationComplete={() => setShown((previous: number) => previous + 1)}
            viewport={{ once: true, amount: 0.5 }}
        >
            <Thumbnail
                url={props.data.preview.url}
                alt="Screenshot of the website."
                width={props.data.preview.width}
                height={props.data.preview.height}
            />
            {props.data.archived && (
                <div className="status">
                    <p>Archived</p>
                    <Package weight="fill" />
                </div>
            )}
            {props.data.building && (
                <div className="status">
                    <p>Building</p>
                    <TrafficCone weight="fill" />
                </div>
            )}
            <div className="information">
                <h3>{props.data.name}</h3>
                <div className="actions">
                    <Button type="action" colour="primary" icon={<Eye />} onClick={() => setProject(props.data)} />
                    {props.data.url && (
                        <Button type="anchor" colour="primary" icon={<ArrowSquareOut />} href={props.data.url} />
                    )}
                </div>
            </div>
        </motion.article>
    );
}
