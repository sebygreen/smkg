import styles from "@/style/WebOfferings.module.css";
import { Code, CodepenLogo, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/Button";

export default function WebOfferings() {
    return (
        <section id="offerings">
            <div className={styles.wrapper}>
                <div className={styles.introduction}>
                    <figure>
                        <Code size={64} weight="duotone" />
                    </figure>
                    <h2>Web Development</h2>
                    <p className={styles.description}>
                        My principal professional activity is site creation and design. Beginning as a hobby in high
                        school, I have now graduated from SAE Institue in Geneva with a Bachelor&apos;s in Web Design &
                        Development, as of 2024.
                    </p>
                    <div className={styles.buttons}>
                        <Button
                            type="anchor"
                            text="CodePen"
                            icon={<CodepenLogo size={20} />}
                            href="https://codepen.io/sebygreen3033"
                        />
                        <Button
                            type="anchor"
                            text="Github"
                            icon={<GithubLogo size={20} />}
                            href="https://github.com/sebygreen"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
