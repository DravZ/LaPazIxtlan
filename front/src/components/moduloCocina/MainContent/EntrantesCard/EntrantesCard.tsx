import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";
import styles from "./EntrantesCard.module.css";
import { useNotification } from "../../../../context/notifications/NotificationContext";
import { setOrdenPreparada } from "../../../../controllers/orden.controller";
import { lateCocinaWait, midCocinaWait } from "../../../../constants/timmers";

interface EntrantesCardProps {
    idOrden: number;
    mesa: number;
    horaPedido: string;
    productos: any[]
}

export default function EntrantesCard({
    idOrden,
    mesa,
    horaPedido,
    productos
}: EntrantesCardProps) {
    const [, forceUpdate] = useState(0);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const { showNotification } = useNotification();

    const confirmOrder = async () => {

        try {
            await setOrdenPreparada(idOrden)

            showNotification({
                type: "success",
                title: "Orden lista!",
                description: `Se ha marcado la orden como lista para entregar.`
            });

        } catch (error) {
            showNotification({
                type: "error",
                title: "Error al marcar orden como lista",
                description: `ERROR: ${error}`
            });
        }
        
        setShowConfirmModal(false);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            forceUpdate((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const inicio = new Date(horaPedido).getTime();

    if (isNaN(inicio)) {
        console.error("Fecha inválida:", horaPedido);
    }
    const minutos = (Date.now() - inicio) / 1000 / 60;

    const status =
        minutos >= lateCocinaWait
            ? "danger"
            : minutos >= midCocinaWait
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

                {productos.map((product: any) => (
                    <div key={product.id_detalle}>
                        <p className={styles.productsList}>
                            <span>{product.cantidad_solicitada}x{" "}</span>
                            {product.producto.nombre_producto}
                        </p>

                        {product.detallesToppings && product.detallesToppings.length > 0 && (
                            <ul className="mb-1">
                                {product.detallesToppings
                                    .map((topping: any) => (
                                        <li key={topping.id_detalle_topping}>
                                            {topping.estado.charAt(0).toUpperCase() + topping.estado.slice(1)}
                                            - {topping.topping.nombre}
                                        </li>
                                    ))}

                            </ul>
                        )}

                    </div>

                ))}

            </div>

            <button
                onClick={() => setShowConfirmModal(true)}
                className={styles.readyButton}>
                ✓ Listo para Despachar
            </button>
            {showConfirmModal && (
                <div
                    className={styles.modalOverlay}
                    onClick={() => setShowConfirmModal(false)}
                >
                    <div
                        className={styles.modal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className={styles.modalTitle}>Marcar orden como preparada</h3>

                        <p className={styles.modalText}>
                            ¿Esta seguro de marcar la orden como preparada?
                        </p>

                        <div className={styles.modalButtons}>
                            <button
                                className={styles.cancelButton}
                                onClick={() => setShowConfirmModal(false)}
                            >
                                Cancelar
                            </button>

                            <button
                                className={styles.confirmButton}
                                onClick={confirmOrder}
                            >
                                Aceptar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}