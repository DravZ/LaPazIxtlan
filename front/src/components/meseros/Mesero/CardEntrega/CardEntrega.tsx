import styles from "./CardEntrega.module.css";
import { Check } from "lucide-react";
import type { MeseroMesas } from "../../../../interfaces/ModuloMesero/MeseroMesas";
import type { OrderItem } from "../../../../interfaces/ModuloMesero/MeseroMesas";

interface CardEntregaProps extends MeseroMesas {}

const CardEntrega = ({ mesaNumber, timer, products }: CardEntregaProps) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.header}>
        <div className={styles.badgeMesa}>Mesa {mesaNumber}</div>

        <span className={styles.readyTime}>Listo a las {timer}</span>
      </div>

      <div className={styles.productsContainer}>
        {products.map((item, index) => (
          <div key={index}>
            <p className={styles.productItem}>
              {item.quantity}x {item.product.productName}
            </p>

            {item.product.toppings && item.product.toppings.length > 0 && (
              <small className={styles.withoutIngredients}>
                Sin: {item.product.toppings.map((t) => t.name).join(", ")}
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
