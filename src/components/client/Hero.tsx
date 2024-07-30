import styles from "@/style/Hero.module.css";
import Fluid from "@/components/client/Fluid";
import Logo from "@/components/svg/Logo";
import Button from "@/components/Button";
import { CloudWarning, LinkedinLogo, FilePdf } from "@phosphor-icons/react/dist/ssr";
import { ToggleCredits } from "@/components/client/Credits";

export default function Hero() {
    return (
        <section id="hero" className={styles.section}>
            <Fluid />
            <div className={styles.wrapper}>
                <Logo />
                <div className={styles.content}>
                    <h1>Web Developer & Designer</h1>
                    <p>
                        Also known as <span>ottomon</span> and <span>sebygreen</span>.
                    </p>
                    <div className={styles.links}>
                        <Button
                            type="anchor"
                            text="LinkedIn"
                            icon={<LinkedinLogo weight="fill" />}
                            href="https://linkedin.com/in/sebastien-green-22a19928a/"
                        />
                        <Button
                            type="anchor"
                            text="Status"
                            icon={<CloudWarning weight="fill" />}
                            href="https://status.smkg.me"
                        />
                        <Button
                            type="anchor"
                            text="CV"
                            icon={<FilePdf weight="fill" />}
                            href="/CV.pdf"
                        />
                        <ToggleCredits />
                    </div>
                </div>
            </div>
        </section>
    );
}
