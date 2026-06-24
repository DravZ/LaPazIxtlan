import styles from "./CardHistorial.module.css";
import type { MeseroMesas } from "../../../../interfaces/ModuloMesero/MeseroMesas";

interface CardEntregaProps extends MeseroMesas {
  status?: "confirmada" | "entregada" | "descartada";
}

const CardHistorial = ({
  mesaNumber,
  timer,
  products = [],
  status = "confirmada",
}: CardEntregaProps) => {
  return (
    <div className={styles.cardContainer}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.leftGroup}>
          <div className={styles.badgeMesa}>Mesa {mesaNumber}</div>

          <span className={`${styles.status} ${styles[status]}`}>
            {/* Agregados los caracteres/iconos correspondientes antes del texto */}
            {status === "confirmada" && "✓ Confirmada"}
            {status === "entregada" && "🗹 Entregada"}
            {status === "descartada" && "☒ Descartada"}
          </span>
        </div>

        {/* Mantiene la prop timer pero quitamos el emoji del reloj aquí */}
        <span className={styles.timerMesa}>{timer}</span>
      </div>

      {/* PRODUCTS */}
      <div className={styles.descriptionProduct}>
        {(products ?? []).map((item, index) => (
          <div key={index}>
            <p>
              {item.quantity}x {item.product.productName}
            </p>

            {item.product.toppings?.length ? (
              <small className={styles.withoutIngredients}>
                Sin: {item.product.toppings.map((t) => t.name).join(", ")}
              </small>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
export default CardHistorial;
