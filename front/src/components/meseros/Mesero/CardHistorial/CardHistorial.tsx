import styles from "./CardHistorial.module.css";
import type { MeseroMesas } from "../../../../interfaces/ModuloMesero/MeseroMesas";


interface CardHistorial {
  idOrden: number;
  mesaNumber: number;
  timer: string;
  price: number;
  confirm: boolean;
  products: any[];
  status?: "Pendiente" | "Lista" | "Descartada";
}

const CardHistorial = ({
  idOrden,
  mesaNumber,
  timer,
  products = [],
  status = "Pendiente",
}: CardHistorial) => {

  const fechaHora = new Date(timer).toLocaleString("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return (
    <div className={styles.cardContainer}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.leftGroup}>
          <div className={styles.badgeMesa}>Mesa {mesaNumber}</div>

          <span className={`${styles.status} ${styles[status]}`}>
            {/* Agregados los caracteres/iconos correspondientes antes del texto */}
            {status === "Pendiente" && "✓ Confirmada"}
            {status === "Lista" && "🗹 Entregada"}
            {status === "Descartada" && "☒ Descartada"}
          </span>
        </div>

        {/* Mantiene la prop timer pero quitamos el emoji del reloj aquí */}
        <span className={styles.timerMesa}>{fechaHora}</span>
      </div>

      {/* PRODUCTS */}
      <div className={styles.descriptionProduct}>
        {(products ?? []).map((item, index) => (
          <div key={index}>
            <p>
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
    </div>
  );
};
export default CardHistorial;
