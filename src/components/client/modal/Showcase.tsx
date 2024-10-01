"use client";

import { useContext, useState } from "react";
import { ShowcaseContext } from "@/context/Showcase";
import { AnimatePresence, AnimationSequence, motion, useAnimate } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarBlank, Download, Tag } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/client/Button";
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import ShowcaseDownload from "@/components/client/showcase/ShowcaseDownload";
import Slide from "@/components/client/showcase/ShowcaseSlide";

export function ShowcaseModal() {
    const { project, setProject } = useContext(ShowcaseContext);
    const [slide, setSlide] = useState<number>(0);
    const [scope, animate] = useAnimate();

    const controls = {
        next: () => {
            if (project && slide < project.images.length - 1) {
                const current = slide;
                const target = slide + 1;
                animate(
                    ".worm",
                    {
                        height: [4, 1, 1, 4],
                        width: [4, 17, 4],
                        x: target * 17,
                    },
                    {
                        height: {
                            duration: 0.4,
                        },
                        width: {
                            delay: 0.1,
                            duration: 0.2,
                        },
                        x: {
                            delay: 0.2,
                            duration: 0.1,
                        },
                    },
                );
                const sequence: AnimationSequence = [
                    [
                        ".slider",
                        { x: `calc(-${current * 100}% - ${current * 50 + 5}px)`, opacity: 0 },
                        { duration: 0.2, ease: "backIn" },
                    ],
                    [".slider", { x: `calc(-${target * 100}% - ${target * 50 - 5}px)` }, { duration: 0 }],
                    [
                        ".slider",
                        { x: `calc(-${target * 100}% - ${target * 50}px)`, opacity: 1 },
                        { duration: 0.2, ease: "backOut" },
                    ],
                ];
                animate(sequence);
                setSlide((previous) => previous + 1);
            }
        },
        back: () => {
            if (slide > 0) {
                const current = slide;
                const target = slide - 1;
                animate(
                    ".worm",
                    {
                        height: [4, 1, 1, 4],
                        width: [4, 17, 4],
                        x: target * 17,
                    },
                    {
                        height: {
                            duration: 0.4,
                        },
                        width: {
                            delay: 0.1,
                            duration: 0.2,
                        },
                        x: {
                            delay: 0.1,
                            duration: 0.1,
                        },
                    },
                );
                const sequence: AnimationSequence = [
                    [
                        ".slider",
                        { x: `calc(-${current * 100}% - ${current * 50 - 5}px)`, opacity: 0 },
                        { duration: 0.2, ease: "backIn" },
                    ],
                    [".slider", { x: `calc(-${target * 100}% - ${target * 50 + 5}px)` }, { duration: 0 }],
                    [
                        ".slider",
                        { x: `calc(-${target * 100}% - ${target * 50}px)`, opacity: 1 },
                        { duration: 0.2, ease: "backOut" },
                    ],
                ];
                animate(sequence);
                setSlide((previous) => previous - 1);
            }
        },
    };

    const motions = {
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
                    staggerChildren: 0.1,
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
                                        <div className="worm" />
                                    </div>
                                </div>
                                <div className="buttons">
                                    <Button
                                        type="action"
                                        colour="primary"
                                        icon={<ArrowLeft />}
                                        onClick={controls.back}
                                        disabled={slide <= 0}
                                    />
                                    <Button
                                        type="action"
                                        colour="primary"
                                        icon={<ArrowRight />}
                                        onClick={controls.next}
                                        disabled={slide >= project.images.length - 1}
                                    />
                                </div>
                            </motion.section>
                        )}
                        {"download" in project && <ShowcaseDownload id={project.id} name={project.name} />}
                        <motion.section className="metadata" variants={motions.section}>
                            <h2>{project.name}</h2>
                            <ul className="tags">
                                <li className="tag">
                                    <CalendarBlank />
                                    <p>{project.year}</p>
                                </li>
                                {"industry" in project && (
                                    <li className="tag">
                                        <Tag />
                                        <p>{project.industry}</p>
                                    </li>
                                )}
                                {"installs" in project && (
                                    <li className="tag">
                                        <Download />
                                        <p>{project.installs}</p>
                                    </li>
                                )}
                            </ul>
                        </motion.section>
                        <motion.span variants={motions.section}>
                            <Button
                                type="action"
                                colour="primary"
                                icon={<CloseIcon />}
                                onClick={() => {
                                    setSlide(0);
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
