import { CreditsModal, CreditsToggle } from "@/components/client/modal/Credits";
import CreditsProvider from "@/context/Credits";
import HomeLogo from "@/components/client/HomeLogo";
import { CloudWarning, FilePdf, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/client/Button";

export default function Page() {
    return (
        <CreditsProvider>
            <CreditsModal />
            <main id="home">
                <div className="wrapper">
                    <HomeLogo />
                    <div className="heading">
                        <h1>Web Developer & Designer</h1>
                        <p>
                            Also known as <span>ottomon</span> and <span>sebygreen</span>.
                        </p>
                        <div className="links">
                            <Button
                                type="anchor"
                                colour="primary"
                                icon={<LinkedinLogo weight="fill" />}
                                text="LinkedIn"
                                href="https://linkedin.com/in/sebastien-green-22a19928a/"
                            />
                            <Button
                                type="anchor"
                                colour="primary"
                                text="Status"
                                icon={<CloudWarning weight="fill" />}
                                href="https://status.smkg.me"
                            />
                            <Button
                                type="anchor"
                                colour="primary"
                                text="Experience"
                                icon={<FilePdf weight="fill" />}
                                href="/CV.pdf"
                            />
                            <CreditsToggle />
                        </div>
                    </div>
                </div>
            </main>
        </CreditsProvider>
    );
}
