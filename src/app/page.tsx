import styles from "./page.module.css";
import Credits from "@/components/client/Credits";
import Hero from "@/components/client/Hero";
import CreditsProvider from "@/context/Credits";

export default function Home() {
    return (
        <CreditsProvider>
            <Credits />
            <main className={styles.main}>
                <Hero />
            </main>
        </CreditsProvider>
    );
}
