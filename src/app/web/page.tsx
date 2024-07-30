import { web } from "@/utilities/fetch";
import styles from "./page.module.css";
import { Code, CodepenLogo, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/Button";
import WebProjects from "@/components/WebProjects";

export default async function Web() {
    const projects = await web();

    return (
        <main>
            <section id="introduction" className={styles.introduction}>
                <div className={styles.tint}>
                    <div className={styles.wrapper}>
                        <figure>
                            <Code weight="duotone" />
                        </figure>
                        <h1>Web Development</h1>
                        <p className={styles.description}>
                            My principal professional activity is site creation and design. Beginning as a hobby in high
                            school, I have now graduated from SAE Institue in Geneva with a Bachelor&apos;s in Web
                            Design & Development, as of 2024.
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
                    <WebProjects data={projects} />
                </div>
            </section>
        </main>
    );
}
