import { CheckCircle2 } from "lucide-react";
import styles from "./CompletadasCard.module.css";

export default function CompletadasCard() {
    return (
        <div className={styles.card + " my-2"}>
            <div className={styles.header}>
                <div className={styles.info}>
                    <span className={styles.mesa}>Mesa 3</span>

                    <span className={styles.time}>
                        Despachado 04:16 p.m.
                    </span>
                </div>

                <CheckCircle2
                    size={18}
                    className={styles.checkIcon}
                />
            </div>

            <div className={styles.products}>
                <ul>
                    <li>
                        2x Tacos al Pastor
                    </li>
                    <li>
                        2x Tacos al Pastor
                    </li>
                </ul>
            </div>
        </div>
    );
}