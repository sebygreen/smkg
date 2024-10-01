"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { CreditsContext } from "@/context/Credits";
import { GithubLogo, Heart } from "@phosphor-icons/react/dist/ssr";
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import Button from "@/components/client/Button";

export function CreditsModal() {
    const { credits, setCredits } = useContext(CreditsContext);

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
                scale: 0.975,
                transition: {
                    duration: 0.3,
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
        close: {
            hidden: {
                opacity: 0,
                scale: 0.9,
                transition: {
                    duration: 0.3,
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

    function handleBubble(e: any) {
        e.stopPropagation();
    }

    return (
        <AnimatePresence>
            {credits && (
                <motion.aside
                    id="credits"
                    onClick={() => setCredits(false)}
                    variants={motions.modal}
                    initial="hidden"
                    animate="shown"
                    exit="hidden"
                >
                    <motion.div className="modal" onClick={handleBubble} variants={motions.section}>
                        <h2>Credits</h2>
                        <div className="links">
                            <a href="https://nextjs.org" target="_blank">
                                NextJS
                            </a>
                            <a href="https://github.com/pocketbase/pocketbase" target="_blank">
                                PocketBase
                            </a>
                            <a href="https://www.framer.com/motion/" target="_blank">
                                Framer Motion
                            </a>
                            <a href="https://github.com/mrdoob/three.js/" target="_blank">
                                Three.js
                            </a>
                            <a href="https://github.com/pmndrs/react-three-fiber" target="_blank">
                                React Three Fiber
                            </a>
                            <a href="https://github.com/phosphor-icons/homepage" target="_blank">
                                Phosphor Icons
                            </a>
                            <a href="https://github.com/simple-icons/simple-icons" target="_blank">
                                Simple Icons
                            </a>
                            <a href="https://github.com/icons-pack/react-simple-icons" target="_blank">
                                React Simple Icons
                            </a>
                            <a href="https://stripe.com/en-fr" target="_blank">
                                Stripe
                            </a>
                            <a href="https://youtube.com/watch?v=LW9d2cqIHb4" target="_blank">
                                Yuri Artiukh
                            </a>
                            <a href="https://github.com/uuidjs/uuid" target="_blank">
                                uuid
                            </a>
                        </div>
                        <p>This website uses no cookies or local storage of any kind.</p>
                        <Button
                            type="anchor"
                            colour="primary"
                            icon={<GithubLogo />}
                            text="Source"
                            href="https://github.com/sebygreen/smkg"
                        />
                        <p className="copyright">&copy; 2024 Sebastien Green</p>
                    </motion.div>
                    <motion.span variants={motions.close}>
                        <Button type="action" colour="primary" icon={<CloseIcon />} onClick={() => setCredits(false)} />
                    </motion.span>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}

export function CreditsToggle() {
    const { setCredits } = useContext(CreditsContext);
    return (
        <Button
            type="action"
            colour="primary"
            icon={<Heart weight="fill" />}
            text="Credits"
            onClick={() => setCredits(true)}
        />
    );
}
