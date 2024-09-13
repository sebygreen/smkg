import styles from "./page.module.css";
import Credits, { ToggleCredits } from "@/components/client/Credits";
import CreditsProvider from "@/context/Credits";
import Fluid from "@/components/client/Fluid";
import Logo from "@/components/svg/Logo";
import Button from "@/components/Button";
import { CloudWarning, FilePdf, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";

export default function Home() {
    return (
        <CreditsProvider>
            <Credits />
            <Fluid />
            <main className={styles.container}>
                <div className={styles.wrapper}>
                    <Logo className={styles.logo} />
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
                                text="Experience"
                                icon={<FilePdf weight="fill" />}
                                href="/CV.pdf"
                            />
                            <ToggleCredits />
                        </div>
                    </div>
                </div>
            </main>
        </CreditsProvider>
    );
}
