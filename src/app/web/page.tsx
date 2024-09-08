import { fetchSites } from "@/utilities/fetch";
import styles from "./page.module.css";
import { Code, CodepenLogo, FloppyDisk, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/Button";
import StaggerProvider from "@/context/Stagger";
import WebProject from "@/components/client/WebProject";
import ViewerProvider from "@/context/Viewer";
import { Viewer } from "@/components/client/Viewer";

export const revalidate = 900;

export default async function Web() {
    const data = {
        sites: await fetchSites(),
    };

    return (
        <ViewerProvider>
            <Viewer />
            <main>
                <section id="introduction" className={styles.introduction}>
                    <div className={styles.wrapper}>
                        <div className={styles.tint}>
                            <Code weight="duotone" />
                            <h1>Web Development</h1>
                            <p className={styles.description}>
                                My principal professional activity is site creation and design. Beginning as a hobby in
                                high school, I have now graduated from SAE Institue in Geneva with a Bachelor&apos;s in
                                Web Design & Development, as of 2024.
                            </p>
                            <div className={styles.links}>
                                <Button
                                    type="anchor"
                                    text="CodePen"
                                    icon={<CodepenLogo />}
                                    href="https://codepen.io/sebygreen3033"
                                />
                                <Button
                                    type="anchor"
                                    text="Github"
                                    icon={<GithubLogo />}
                                    href="https://github.com/sebygreen"
                                />
                            </div>
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
                            <div className={styles.sites}>
                                {data.sites.map((i, n) => (
                                    <WebProject key={i.id} data={i} index={n} />
                                ))}
                            </div>
                        </StaggerProvider>
                    </div>
                </section>
            </main>
        </ViewerProvider>
    );
}
