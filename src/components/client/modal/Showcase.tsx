"use client";

import { useRef } from "react";
import { useShowcase } from "@/context/Showcase";
import { AnimatePresence, motion, stagger, useAnimate } from "motion/react";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    CalendarBlankIcon,
    DownloadIcon,
    TagIcon,
    XIcon,
} from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/client/Button";
import ShowcaseDownload from "@/components/client/showcase/ShowcaseDownload";
import Slide from "@/components/client/showcase/ShowcaseSlide";
import { Variants } from "motion";

const motions: { [key: string]: Variants } = {
    modal: {
        hidden: {
            opacity: 0,
            transition: {
                duration: 0.3,
                ease: "easeIn",
                when: "afterChildren",
            },
        },
        shown: {
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: "easeOut",
                when: "beforeChildren",
                delayChildren: stagger(0.1),
            },
        },
    },
    section: {
        hidden: {
            opacity: 0,
            scale: 0.95,
            transition: {
                duration: 0.1,
                ease: "easeIn",
            },
        },
        shown: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: "backOut",
            },
        },
    },
};

export function ShowcaseModal() {
    const { project, setProject } = useShowcase();
    const [scope, animate] = useAnimate();
    const slide = useRef<number>(0);

    function toSlide(target: number) {
        const forward = target > slide.current;
        const delta = Math.abs(target - slide.current);
        animate(
            ".worm",
            {
                scale: [2, 1, 1, 2],
                width: [2, 10 * delta + 2 * delta + 2, 2],
                x: target * 17,
            },
            {
                scale: {
                    duration: 0.4,
                },
                width: {
                    delay: 0.1,
                    duration: 0.2,
                },
                x: {
                    delay: forward ? 0.2 : 0.1,
                    duration: 0.1,
                },
                ease: "easeInOut",
            },
        );
        animate(
            ".slider",
            {
                x: `calc(-${target * 100}% - ${target * 50}px)`,
                opacity: [1, 0, 1],
            },
            {
                duration: 0.4,
                ease: "circInOut",
            },
        );
        slide.current = target;
    }

    function next() {
        if (!project) return;
        if (project && slide.current === project.images.length - 1) {
            toSlide(0);
        } else {
            toSlide(slide.current + 1);
        }
    }

    function back() {
        if (!project) return;
        if (slide.current === 0) {
            toSlide(project.images.length - 1);
        } else {
            toSlide(slide.current - 1);
        }
    }

    return (
        <AnimatePresence>
            {project && (
                <motion.aside
                    ref={scope}
                    id="showcase"
                    className={project.type}
                    initial="hidden"
                    animate="shown"
                    exit="hidden"
                    variants={motions.modal}
                >
                    <div className="wrapper">
                        <motion.section className="display" variants={motions.section}>
                            <div className="slider">
                                {project.images.map((i, n) => (
                                    <Slide
                                        key={n}
                                        src={i.url}
                                        alt={`Preview image for ${project.name}.`}
                                        width={i.width}
                                        height={i.height}
                                    />
                                ))}
                            </div>
                        </motion.section>
                        {project.images.length > 1 && (
                            <motion.section className="controls" variants={motions.section}>
                                <div className="dots">
                                    {project.images.map((i, n) => (
                                        <div key={n} className="dot" />
                                    ))}
                                    <div className="track">
                                        <div className="worm" style={{ transform: "scale(2)" }} />
                                    </div>
                                </div>
                                <div className="buttons">
                                    <Button type="action" colour="primary" icon={<ArrowLeftIcon />} onClick={back} />
                                    <Button type="action" colour="primary" icon={<ArrowRightIcon />} onClick={next} />
                                </div>
                            </motion.section>
                        )}
                        {"download" in project && <ShowcaseDownload id={project.id} name={project.name} />}
                        <motion.section className="metadata" variants={motions.section}>
                            <h2>{project.name}</h2>
                            <ul className="tags">
                                <li className="tag">
                                    <CalendarBlankIcon />
                                    <p>{project.year}</p>
                                </li>
                                {"industry" in project && (
                                    <li className="tag">
                                        <TagIcon />
                                        <p>{project.industry}</p>
                                    </li>
                                )}
                                {"installs" in project && (
                                    <li className="tag">
                                        <DownloadIcon />
                                        <p>{project.installs}</p>
                                    </li>
                                )}
                            </ul>
                        </motion.section>
                        <motion.span variants={motions.section}>
                            <Button
                                type="action"
                                colour="primary"
                                icon={<XIcon />}
                                onClick={() => {
                                    slide.current = 0;
                                    setProject(null);
                                }}
                            />
                        </motion.span>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}
