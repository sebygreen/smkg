import { FloppyDisk, PaintBucket } from "@phosphor-icons/react/dist/ssr";
import { fetchBranding, fetchIcons, fetchInterfaces } from "@/utilities/fetch";
import ShowcaseProvider from "@/context/Showcase";
import DesignProject from "@/components/client/DesignProject";
import StaggerProvider from "@/context/Stagger";
import { ShowcaseModal } from "@/components/client/modal/Showcase";
import { Metadata } from "next";

export const revalidate = 900;

export const metadata: Metadata = {
    title: "Design",
};

export default async function Page() {
    const data = {
        icons: await fetchIcons(),
        interfaces: await fetchInterfaces(),
        branding: await fetchBranding(),
    };

    return (
        <ShowcaseProvider>
            <ShowcaseModal />
            <main id="design">
                <section id="introduction">
                    <div className="wrapper">
                        <div className="tint">
                            <PaintBucket weight="duotone" />
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
                                <FloppyDisk weight="duotone" />
                            </div>
                            <div className="icons">
                                {data.icons.map((i, n) => (
                                    <DesignProject key={i.id} data={i} index={n} />
                                ))}
                            </div>
                            <div className="hr" />
                            <div className="interfaces">
                                {data.interfaces.map((i, n) => (
                                    <DesignProject key={i.id} data={i} index={n + data.icons.length} />
                                ))}
                            </div>
                            <div className="hr" />
                            <div className="branding">
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
