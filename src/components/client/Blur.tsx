import { usePathname } from "next/navigation";

export default function Blur() {
    const pathname = usePathname();
    return pathname !== "/" && <div className="blur" />;
}
