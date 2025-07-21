import { FloppyDiskIcon, PaintBucketIcon } from "@phosphor-icons/react/dist/ssr";
import { fetchBranding, fetchIcons, fetchInterfaces } from "@/utilities/fetch";
import ShowcaseProvider from "@/context/Showcase";
import DesignProject from "@/components/client/DesignProject";
import StaggerProvider from "@/context/Stagger";
import { ShowcaseModal } from "@/components/client/modal/Showcase";
import { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
    title: "Design",
};

export default async function Page() {
    const [icons, interfaces, branding] = await Promise.all([
        await fetchIcons(),
        await fetchInterfaces(),
        await fetchBranding(),
    ]);

    return (
        <ShowcaseProvider>
            <ShowcaseModal />
            <main id="design">
                <section id="introduction">
                    <div className="wrapper">
                        <div className="tint">
                            <PaintBucketIcon weight="duotone" />
                            <h1>Design</h1>
                            <p className="description">
                                I have always loved to draw, very likely a desire inherited from my parents. My doodles
                                of choice were geometric landscapes with perfect spacing. This turns out to translate
                                well to layout based design, such as user interfaces or infographics, which I now
                                actively do along side web development.
                            </p>
                        </div>
                    </div>
                </section>
                <section id="projects">
                    <div className="wrapper">
                        <StaggerProvider>
                            <div className="heading">
                                <h2>Projects</h2>
                                <FloppyDiskIcon weight="duotone" />
                            </div>
                            <div className="icons">
                                {icons.map((i, n) => (
                                    <DesignProject key={i.id} data={i} index={n} />
                                ))}
                            </div>
                            <div className="hr" />
                            <div className="interfaces">
                                {interfaces.map((i, n) => (
                                    <DesignProject key={i.id} data={i} index={n + icons.length} />
                                ))}
                            </div>
                            <div className="hr" />
                            <div className="branding">
                                {branding.map((i, n) => (
                                    <DesignProject key={i.id} data={i} index={n + icons.length + interfaces.length} />
                                ))}
                            </div>
                        </StaggerProvider>
                    </div>
                </section>
            </main>
        </ShowcaseProvider>
    );
}
