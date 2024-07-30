import styles from "@/style/WebOffering.module.css";
import {
    SiAngular,
    SiCss3,
    SiHtml5,
    SiJavascript,
    SiLaravel,
    SiNextdotjs,
    SiPhp,
    SiSquarespace,
    SiVuedotjs,
    SiWix,
    SiWordpress,
} from "@icons-pack/react-simple-icons";
import { Offering } from "@/types/web";

export default function WebOffering({ data }: { data: Offering }) {
    return (
        <article className={styles.service}>
            <h3>{data.title}</h3>
            <div className={styles.stack}>
                <Stack title={data.title} />
            </div>
            <p>{data.description}</p>
            <div className={styles.rating}>
                {Object.entries(data.rating).map((k: [string, number]) => (
                    <Score key={k[0]} data={{ key: k[0], score: k[1] }} />
                ))}
            </div>
        </article>
    );
}

function Stack({ title }: { title: "Builder" | "Classic" | "Hybrid" | "Dynamic" }) {
    switch (title) {
        case "Builder":
            return (
                <>
                    <SiWordpress />
                    <SiSquarespace />
                    <SiWix />
                </>
            );
        case "Classic":
            return (
                <>
                    <SiHtml5 />
                    <SiCss3 />
                    <SiJavascript />
                </>
            );
        case "Hybrid":
            return (
                <>
                    <SiPhp />
                    <SiLaravel />
                    <SiJavascript />
                </>
            );
        case "Dynamic":
            return (
                <>
                    <SiNextdotjs />
                    <SiVuedotjs />
                    <SiAngular />
                </>
            );
    }
}

function Score({ data }: { data: { key: string; score: number } }) {
    let units = [];
    for (let i = 0; i < 5; i++) {
        units.push(<div key={i} className={i < data.score ? styles.on : styles.off} />);
    }

    return (
        <article className={styles.score}>
            <p>{data.key}</p>
            <div className={styles.hl} />
            <div className={styles.indicator}>{units.map((i) => i)}</div>
        </article>
    );
}
