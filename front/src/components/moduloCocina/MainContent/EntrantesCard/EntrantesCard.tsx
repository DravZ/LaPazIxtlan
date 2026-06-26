import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";
import styles from "./EntrantesCard.module.css";

interface EntrantesCardProps {
    mesa: number;
    horaPedido: string;
}

export default function EntrantesCard({
    mesa,
    horaPedido,
}: EntrantesCardProps) {
    const [, forceUpdate] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            forceUpdate((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const inicio = new Date(horaPedido).getTime();
    const minutos = (Date.now() - inicio) / 1000 / 60;

    const status =
        minutos >= 10
            ? "danger"
            : minutos >= 5
                ? "warning"
                : "success";

    const getElapsedTime = () => {
        const diff = Math.floor((Date.now() - inicio) / 1000);

        const hrs = Math.floor(diff / 3600);
        const mins = Math.floor((diff % 3600) / 60);
        const secs = diff % 60;

        if (hrs > 0) {
            return `${hrs}h ${String(mins).padStart(2, "0")}m`;
        }

        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(
            2,
            "0"
        )}`;
    };

    return (
        <div className={styles.card + " p-0 my-2"}>
            <div className={`${styles.header} ${styles[status]}`}>
                <span className={styles.mesa}>MESA {mesa}</span>

                <span className={styles.timer}>
                    <Clock3 size={15} />
                    {getElapsedTime()}
                </span>
            </div>

            <div className={styles.body}>
                <p className={styles.productsList}>
                    <span>1x</span> Hamburguesa Ixtlan
                </p>

                <ul>
                    <li>
                        Sin - Cebolla
                    </li>
                </ul>

                <p className={styles.productsList}>
                    <span>2x</span> Limonada Natural
                </p>
            </div>

            <button className={styles.readyButton}>
                ✓ Listo para Despachar
            </button>
        </div>
    );
}