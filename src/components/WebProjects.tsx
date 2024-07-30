"use client";

import styles from "@/style/WebProjects.module.css";
import { Project } from "@/types/web";
import { Folders } from "@phosphor-icons/react";
import WebProjectsProvider from "@/context/WebProjects";
import WebProject from "@/components/client/WebProject";

export default function WebProjects({ data }: { data: Project[] }) {
    return (
        <WebProjectsProvider>
            <div className={styles.heading}>
                <figure>
                    <Folders weight="duotone" />
                </figure>
                <h2>Projects</h2>
            </div>
            <div className={styles.projects}>
                {data.map((i: Project, n: number) => (
                    <WebProject key={i.id} data={i} index={n} />
                ))}
            </div>
        </WebProjectsProvider>
    );
}
