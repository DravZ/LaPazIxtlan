import styles from "./CardEntrega.module.css";
import { Check } from "lucide-react";
import type { MeseroMesas } from "../../../../interfaces/ModuloMesero/MeseroMesas";
import type { OrderItem } from "../../../../interfaces/ModuloMesero/MeseroMesas";

interface CardEntregaProps {
  id_orden: number;
  mesaNumber: number;
  timer: string;
  price: number;
  confirm: boolean;
  products: any[];
}

const CardEntrega = ({
  id_orden,
  mesaNumber,
  timer,
  products
}: CardEntregaProps) => {
  const horaLista = new Date(timer).toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return (
    <div className={styles.cardContainer}>
      <div className={styles.header}>
        <div className={styles.badgeMesa}>Mesa {mesaNumber}</div>

        <span className={styles.readyTime}>
          Listo a las {horaLista}
        </span>
      </div>

      <div className={styles.productsContainer}>
        {products.map((item, index) => (
          <div key={index} className="mb-2">
            <p className="mb-0">
              {item.cantidad_solicitada}x {item.producto?.nombre_producto}
            </p>

            {item.detallesToppings && item.detallesToppings.length > 0 && (
              <small className={styles.withoutIngredients}>
                {item.detallesToppings
                  .map((topping: any) => `${topping.topping.nombre} (${topping.estado})`)
                  .join(", ")}
              </small>
            )}
          </div>
        ))}
      </div>

      <button className={styles.deliveredButton}>
        <Check size={22} />
        Entregado
      </button>
    </div>
  );
};

export default CardEntrega;
