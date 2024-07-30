"use client";

import styles from "@/style/DesignProjects.module.css";
import { Project } from "@/types/design";
import { Folders } from "@phosphor-icons/react";
import DesignProjectsProvider from "@/context/DesignProjects";
import DesignProject from "@/components/client/DesignProject";

export default function DesignProjects({ data }: { data: Project[] }) {
    let grouped: {
        logo: Project[];
        interface: Project[];
        icon: Project[];
    } = {
        logo: [],
        interface: [],
        icon: [],
    };

    data.map((i) => {
        if (i.type === "Logo") {
            grouped.logo.push(i);
        } else if (i.type === "Interface") {
            grouped.interface.push(i);
        } else if (i.type === "Icon") {
            grouped.icon.push(i);
        }
    });

    return (
        <DesignProjectsProvider>
            <div className={styles.heading}>
                <figure>
                    <Folders weight="duotone" />
                </figure>
                <h2>Projects</h2>
            </div>
            <div className={styles.logos}>
                {grouped.logo.map((i, n) => (
                    <DesignProject key={i.id} data={i} index={n} />
                ))}
            </div>
            <div className={styles.hr} />
            <div className={styles.interfaces}>
                {grouped.interface.map((i, n) => (
                    <DesignProject key={i.id} data={i} index={n + grouped.logo.length} />
                ))}
            </div>
            <div className={styles.hr} />
            <div className={styles.icons}>
                {grouped.icon.map((i, n) => (
                    <DesignProject key={i.id} data={i} index={n + grouped.logo.length + grouped.interface.length} />
                ))}
            </div>
        </DesignProjectsProvider>
    );
}
