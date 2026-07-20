import { CheckCircle2 } from "lucide-react";
import styles from "./CompletadasCard.module.css";

interface ComppletadasCardProps {
    idOrden: number;
    mesa: number;
    horaDespachado: string;
    productos: any[]
}
export default function CompletadasCard({
    idOrden,
    mesa,
    horaDespachado,
    productos
}: ComppletadasCardProps) {
    const horaFormateada = new Date(horaDespachado).toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
    return (
        <div className={styles.card + " my-2"}>
            <div className={styles.header}>
                <div className={styles.info}>
                    <span className={styles.mesa}>Mesa {mesa}</span>

                    <span className={styles.time}>
                        Despachado a las {horaFormateada}
                    </span>
                </div>

                <CheckCircle2
                    size={18}
                    className={styles.checkIcon}
                />
            </div>

            <div className={styles.products}>
                {productos.map((product: any) => (
                    <ul className="mb-1" key={product.id_detalle}>
                        <li>
                            <strong>{product.cantidad_solicitada}x{" "}{product.producto.nombre_producto}</strong>
                            <p className="mb-0">
                                {product.detallesToppings && product.detallesToppings.length > 0 && (
                                    <>
                                        {product.detallesToppings
                                            .map((topping: any) => (
                                                `${topping.topping.nombre}[${topping.estado.charAt(0).toUpperCase() + topping.estado.slice(1)}].`
                                            ))}

                                    </>
                                )}
                            </p>

                        </li>



                    </ul>

                ))}

            </div>
        </div>
    );
}