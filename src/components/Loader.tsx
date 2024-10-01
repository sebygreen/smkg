interface LoaderBase {
    page?: boolean;
    small?: boolean;
}

export default function Loader({ ...props }: LoaderBase) {
    const classGenerator = () => {
        const initial = ["loader"];
        props.page && initial.push("page");
        return initial.join(" ");
    };

    return (
        <section className={classGenerator()}>
            <svg className={props.small ? "small" : undefined} viewBox="0 0 40 40" height="40" width="40">
                <circle className="track" cx="20" cy="20" r="17.5" pathLength="100" strokeWidth="5px" fill="none" />
                <circle className="car" cx="20" cy="20" r="17.5" pathLength="100" strokeWidth="5px" fill="none" />
            </svg>
        </section>
    );
}
