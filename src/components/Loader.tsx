import styles from "@/style/Loader.module.css";

export default function Loader({ page, small, className }: { page?: boolean; small?: boolean; className?: string }) {
    return (
        <div className={`${page ? styles.layout : undefined} ${className ? className : undefined}`}>
            <svg
                className={`${styles.container} ${small ? styles.small : undefined}`}
                viewBox="0 0 40 40"
                height="40"
                width="40"
            >
                <circle
                    className={styles.track}
                    cx="20"
                    cy="20"
                    r="17.5"
                    pathLength="100"
                    strokeWidth="5px"
                    fill="none"
                />
                <circle
                    className={styles.car}
                    cx="20"
                    cy="20"
                    r="17.5"
                    pathLength="100"
                    strokeWidth="5px"
                    fill="none"
                />
            </svg>
        </div>
    );
}
