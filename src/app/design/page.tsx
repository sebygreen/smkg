import styles from "./page.module.css";
import { ArrowSquareOut, PaintBucket } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/Button";
import { design } from "@/utilities/fetch";
import DesignProjects from "@/components/DesignProjects";
import ShowcaseProvider from "@/context/Showcase";
import Showcase from "@/components/client/Showcase";

export default async function Design() {
    const projects = await design();

    return (
        <ShowcaseProvider>
            <Showcase />
            <main>
                <section className={styles.introduction}>
                    <div className={styles.tint}>
                        <div className={styles.wrapper}>
                            <figure>
                                <PaintBucket weight="duotone" />
                            </figure>
                            <h1>Design</h1>
                            <p className={styles.description}>
                                I have always loved to draw, very likely a desire inherited from my parents. My doodles
                                of
                                choice were geometric landscapes with perfect spacing. This turns out to translate well
                                to
                                layout based design, such as user interfaces or infographics, which I now actively do
                                along
                                side web development.
                            </p>
                            <div className={styles.links}>
                                <Button
                                    type="anchor"
                                    text="macOS Icons"
                                    icon={<ArrowSquareOut />}
                                    href="https://macosicons.com/#/u/sebastien_green"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section id="projects" className={styles.projects}>
                    <div className={styles.wrapper}>
                        <DesignProjects data={projects} />
                    </div>
                </section>
            </main>
        </ShowcaseProvider>
    );
}
