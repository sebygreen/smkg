"use client";

import styles from "@/style/Credits.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { CreditsContext } from "@/context/Credits";
import Button from "@/components/Button";
import { Code, HandsPraying } from "@phosphor-icons/react/dist/ssr";

export default function Credits() {
    const { credits, setCredits } = useContext(CreditsContext);

    function handleClose() {
        setCredits(false);
    }

    function handleBubble(e: any) {
        e.stopPropagation();
    }

    const motions = {
        container: {
            hidden: {
                opacity: 0,
                transition: {
                    duration: 0.3,
                    ease: "linear",
                    when: "afterChildren"
                },
            },
            shown: {
                opacity: 1,
                transition: {
                    duration: 0.3,
                    ease: "linear",
                    when: "beforeChildren"
                },
            },
        },
        modal: {
            hidden: {
                opacity: 0,
                scale: 0.95,
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

    return (
        <AnimatePresence>
            {credits && (
                <motion.section
                    id="credits"
                    className={styles.credits}
                    onClick={handleClose}
                    variants={motions.container}
                    initial="hidden"
                    animate="shown"
                    exit="hidden"
                >
                    <motion.div className={styles.wrapper} variants={motions.modal} onClick={handleBubble}>
                        <h2>Credits</h2>
                        <p>&copy; 2024 Sebastien Green</p>
                        <div className={styles.links}>
                            <a href="https://nextjs.org">NextJS</a>
                            <a href="https://github.com/pocketbase/pocketbase">PocketBase</a>
                            <a href="https://www.framer.com/motion/">Framer Motion</a>
                            <a href="https://github.com/mrdoob/three.js/">Three.js</a>
                            <a href="https://github.com/pmndrs/react-three-fiber">React Three Fiber</a>
                            <a href="https://github.com/phosphor-icons/homepage">Phosphor Icons</a>
                            <a href="https://github.com/simple-icons/simple-icons">Simple Icons</a>
                            <a href="https://github.com/icons-pack/react-simple-icons">React Simple Icons</a>
                            <a href="https://stripe.com/en-fr">Stripe</a>
                            <a href="https://www.youtube.com/watch?v=LW9d2cqIHb4">Yuri Artiukh</a>
                            <a href="https://github.com/uuidjs/uuid">uuid</a>
                        </div>
                        <p>This website uses no cookies or local storage of any kind.</p>
                        <Button type="anchor" icon={<Code />} text="Source" href="https://github.com/sebygreen/smkg" />
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    );
}

export function ToggleCredits() {
    const { setCredits } = useContext(CreditsContext);
    return (
        <Button type="button" text="Credits" icon={<HandsPraying weight="fill" />} onClick={() => setCredits(true)} />
    );
}
