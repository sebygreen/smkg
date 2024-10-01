import { fetchSites } from "@/utilities/fetch";
import { Code, CodepenLogo, FloppyDisk, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/client/Button";
import StaggerProvider from "@/context/Stagger";
import WebProject from "@/components/client/WebProject";
import ShowcaseProvider from "@/context/Showcase";
import { ShowcaseModal } from "@/components/client/modal/Showcase";
import { Metadata } from "next";

export const revalidate = 900;

export const metadata: Metadata = {
    title: "Web Development",
};

export default async function Page() {
    const data = { sites: await fetchSites() };

    return (
        <ShowcaseProvider>
            <ShowcaseModal />
            <main id="web">
                <section id="introduction">
                    <div className="wrapper">
                        <div className="tint">
                            <Code weight="duotone" />
                            <h1>Web Development</h1>
                            <p className="description">
                                My principal professional activity is site creation and design. Beginning as a hobby in
                                high school, I have now graduated from SAE Institue in Geneva with a Bachelor&apos;s in
                                Web Design & Development, as of 2024.
                            </p>
                            <div className="links">
                                <Button
                                    type="anchor"
                                    colour="primary"
                                    text="CodePen"
                                    icon={<CodepenLogo />}
                                    href="https://codepen.io/sebygreen3033"
                                />
                                <Button
                                    type="anchor"
                                    colour="primary"
                                    text="Github"
                                    icon={<GithubLogo />}
                                    href="https://github.com/sebygreen"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section id="projects">
                    <div className="wrapper">
                        <StaggerProvider>
                            <div className="heading">
                                <h2>Projects</h2>
                                <FloppyDisk weight="duotone" />
                            </div>
                            <div className="grid">
                                {data.sites.map((i, n) => (
                                    <WebProject key={i.id} data={i} index={n} />
                                ))}
                            </div>
                        </StaggerProvider>
                    </div>
                </section>
            </main>
        </ShowcaseProvider>
    );
}
