"use client";

import styles from "@/style/Hero.module.css";
import Fluid from "@/components/client/Fluid";
import Logo from "@/components/svg/Logo";
import Button from "@/components/Button";
import { CloudWarning, FilePdf, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { ToggleCredits } from "@/components/client/Credits";
import { motion } from "framer-motion";

const motions = {
    buttons: {
        shown: {
            transition: {
                staggerChildren: 0.05,
            },
        },
    },
    button: {
        hidden: {
            opacity: 0,
            scale: 0.5,
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

export default function Hero() {
    return (
        <section id="hero" className={styles.section}>
            <Fluid />
            <div className={styles.wrapper}>
                <Logo />
                <div className={styles.content}>
                    <h1>Web Developer & Designer</h1>
                    <p>
                        Also known as <span>ottomon</span> and <span>sebygreen</span>.
                    </p>
                    <motion.div className={styles.links} initial="hidden" animate="shown" variants={motions.buttons}>
                        <motion.span variants={motions.button}>
                            <Button
                                type="anchor"
                                text="LinkedIn"
                                icon={<LinkedinLogo weight="fill" />}
                                href="https://linkedin.com/in/sebastien-green-22a19928a/"
                            />
                        </motion.span>
                        <motion.span variants={motions.button}>
                            <Button
                                type="anchor"
                                text="Status"
                                icon={<CloudWarning weight="fill" />}
                                href="https://status.smkg.me"
                            />
                        </motion.span>
                        <motion.span variants={motions.button}>
                            <Button type="anchor" text="C.V." icon={<FilePdf weight="fill" />} href="/CV.pdf" />
                        </motion.span>
                        <motion.span variants={motions.button}>
                            <ToggleCredits />
                        </motion.span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
