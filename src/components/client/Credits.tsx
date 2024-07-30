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
        parent: {
            hidden: {
                opacity: 0,
                transition: {
                    duration: 0.3,
                },
            },
            shown: {
                opacity: 1,
                transition: {
                    duration: 0.3,
                },
            },
        },
        child: {
            hidden: {
                scale: 0.95,
                transition: {
                    duration: 0.3,
                },
            },
            shown: {
                scale: 1,
                transition: {
                    duration: 0.3,
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
                    variants={motions.parent}
                    initial="hidden"
                    animate="shown"
                    exit="hidden"
                >
                    <motion.div className={styles.wrapper} variants={motions.child} onClick={handleBubble}>
                        <h2>Credits</h2>
                        <p>&copy; 2024 Sebastien Green</p>
                        <div className={styles.links}>
                            <p>NextJS</p>
                            <p>PocketBase</p>
                            <p>Framer Motion</p>
                            <p>Three.js</p>
                            <p>React Three Fiber</p>
                            <p>Phosphor Icons</p>
                            <p>Stripe</p>
                        </div>
                        <p>This website uses no cookies or local storage of any kind.</p>
                        <Button type="anchor" icon={<Code />} text="Source" />
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    );
}

export function ToggleCredits() {
    const { setCredits } = useContext(CreditsContext);
    return <Button type="button" text="Credits" icon={<HandsPraying weight="fill" />} click={() => setCredits(true)} />;
}
