// components/MainContent.tsx
import styles from "./CardOrden.module.css";
import type { OrderItem } from "../../../../interfaces/ModuloMesero/MeseroMesas";
import { useEffect, useState } from "react";
import { lateWait, midWait } from "../../../../constants/timmers";

interface CardOrdenProps {
  idOrden: number
  mesaNumber: number;
  timer: string;
  price: number;
  confirm: boolean;
  products: any[];
}

const CardOrden = ({
  idOrden,
  mesaNumber,
  timer,
  price,
  confirm,
  products,
}: CardOrdenProps) => {
  const [minutesElapsed, setMinutesElapsed] = useState(0);
  const timerClass =
    minutesElapsed >= lateWait
      ? styles.timerRed
      : minutesElapsed >= midWait
        ? styles.timerYellow
        : styles.timerGreen;

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [numMesa, setNumMesa] = useState("");

  const confirmOrder = () => {
    console.log(
      `Orden ${numMesa} confirmada por mesero en la mesa ${mesaNumber}`
    );

    setShowConfirmModal(false);
    setNumMesa("")
  };

  useEffect(() => {
    const calculateMinutes = () => {
      const createdAt = new Date(timer).getTime();
      const now = Date.now();

      const minutes = Math.floor((now - createdAt) / 1000 / 60);
      setMinutesElapsed(minutes);
    };

    calculateMinutes();

    const interval = setInterval(calculateMinutes, 60000);

    return () => clearInterval(interval);
  }, [timer]);


  return (
    <div className={`p-4 ${styles.cardContainer}`}>
      <div className={styles.header}>
        <div className={styles.badgeMesa}>Mesa {mesaNumber}</div>

        <div className={`${styles.timerMesa} ${timerClass}`}>
          ● Hace {minutesElapsed} min
        </div>
      </div>

      <div className={styles.descriptionProduct}>
        {products.map((item, index) => (
          <div key={index} className="mb-2">
            <p className="mb-0">
              {item.cantidad_solicitada}x {item.producto.nombre_producto}
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

      <div className={styles.totalContainer}>
        <span>Total del pedido:</span>
        <span>${price}</span>
      </div>

      <div className={styles.buttonContainer}>
        <button
          className={styles.confirmButton}
          onClick={() => setShowConfirmModal(true)}
        >
          Confirmar
        </button>

        <button className={styles.cancelButton}>Descartar</button>
      </div>

      {showConfirmModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowConfirmModal(false)}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={styles.modalTitle}>Confirmar pedido</h3>

            <p className={styles.modalText}>
              Confirma el numero de mesa. Actualmente mesa:{" "}
              <strong>{mesaNumber}</strong>.
            </p>

            <input
              type="number"
              className={styles.modalInput}

              placeholder="Número de mesa"
              value={numMesa}
              onChange={(e) => setNumMesa(e.target.value)}
            />

            <div className={styles.modalButtons}>
              <button
                className={styles.cancelButton}
                onClick={() => setShowConfirmModal(false)}
              >
                Cancelar
              </button>

              <button
                className={styles.confirmButton}
                disabled={numMesa.trim() == ""}
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


};

export default CardOrden;
