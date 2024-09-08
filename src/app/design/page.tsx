import styles from "./page.module.css";
import { FloppyDisk, PaintBucket } from "@phosphor-icons/react/dist/ssr";
import { fetchBranding, fetchIcons, fetchInterfaces } from "@/utilities/fetch";
import ShowcaseProvider from "@/context/Showcase";
import Showcase from "@/components/client/Showcase";
import DesignProject from "@/components/client/DesignProject";
import StaggerProvider from "@/context/Stagger";

export const revalidate = 900;

export default async function Design() {
    const data = {
        icons: await fetchIcons(),
        interfaces: await fetchInterfaces(),
        branding: await fetchBranding(),
    };

    return (
        <ShowcaseProvider>
            <Showcase />
            <main>
                <section id="introduction" className={styles.introduction}>
                    <div className={styles.wrapper}>
                        <div className={styles.tint}>
                            <PaintBucket weight="duotone" />
                            <h1>Design</h1>
                            <p className={styles.description}>
                                I have always loved to draw, very likely a desire inherited from my parents. My doodles
                                of choice were geometric landscapes with perfect spacing. This turns out to translate
                                well to layout based design, such as user interfaces or infographics, which I now
                                actively do along side web development.
                            </p>
                        </div>
                    </div>
                </section>
                <section id="projects" className={styles.projects}>
                    <div className={styles.wrapper}>
                        <StaggerProvider>
                            <div className={styles.heading}>
                                <h2>Projects</h2>
                                <FloppyDisk weight="duotone" />
                            </div>
                            <div className={styles.icons}>
                                {data.icons.map((i, n) => (
                                    <DesignProject key={i.id} data={i} index={n} />
                                ))}
                            </div>
                            <div className={styles.hr} />
                            <div className={styles.interfaces}>
                                {data.interfaces.map((i, n) => (
                                    <DesignProject key={i.id} data={i} index={n + data.icons.length} />
                                ))}
                            </div>
                            <div className={styles.hr} />
                            <div className={styles.branding}>
                                {data.branding.map((i, n) => (
                                    <DesignProject
                                        key={i.id}
                                        data={i}
                                        index={n + data.icons.length + data.interfaces.length}
                                    />
                                ))}
                            </div>
                        </StaggerProvider>
                    </div>
                </section>
            </main>
        </ShowcaseProvider>
    );
}
