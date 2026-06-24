// components/MainContent.tsx
import styles from "./CardOrden.module.css";
import type { OrderItem } from "../../../../interfaces/ModuloMesero/MeseroMesas";

interface CardOrdenProps {
  mesaNumber: number;
  timer: number;
  price: number;
  confirm: boolean;
  products: OrderItem[];
}

const CardOrden = ({
  mesaNumber,
  timer,
  price,
  confirm,
  products,
}: CardOrdenProps) => {
  return (
    <div className={`p-4 ${styles.cardContainer}`}>
      <div className={styles.header}>
        <div className={styles.badgeMesa}>Mesa {mesaNumber}</div>

        <div className={styles.timerMesa}>● Hace {timer} min</div>
      </div>

      <div className={styles.descriptionProduct}>
        {products.map((item, index) => (
          <div key={index} className="mb-2">
            <p className="mb-0">
              {item.quantity}x {item.product.productName}
            </p>

            {item.product.toppings && item.product.toppings.length > 0 && (
              <small className={styles.withoutIngredients}>
                Sin:{" "}
                {item.product.toppings
                  .map((topping) => topping.name)
                  .join(", ")}
              </small>
            )}
          </div>
        ))}
      </div>

      <div className={styles.totalContainer}>
        <span>Total del pedido:</span>
        <span>${price}</span>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.confirmButton}>Confirmar</button>

        <button className={styles.cancelButton}>Descartar</button>
      </div>
    </div>
  );
};

export default CardOrden;
