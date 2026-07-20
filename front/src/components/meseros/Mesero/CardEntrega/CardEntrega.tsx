import styles from "./CardEntrega.module.css";
import { Check } from "lucide-react";
import type { MeseroMesas } from "../../../../interfaces/ModuloMesero/MeseroMesas";
import type { OrderItem } from "../../../../interfaces/ModuloMesero/MeseroMesas";
import { useState } from "react";
import { entregarOrden } from "../../../../controllers/orden.controller";
import { useNotification } from "../../../../context/notifications/NotificationContext";

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
  const [showConfirmarEntrega, setShowConfirmarEntrega] = useState(false);

  const { showNotification } = useNotification();

  const confirmEntrega = async () => {

    
    try{
      await entregarOrden(id_orden)
 
      showNotification({
          type: "success",
          title: "Orden entregada!",
          description: `Se ha marcado la orden como entregada`
        });
      
    }catch(error){
      showNotification({
          type: "error",
          title: "Error al marcar orden como entregada",
          description: `ERROR: ${error}`
        });
    }
    

    setShowConfirmarEntrega(false);
  };
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

      <button className={styles.deliveredButton}
        onClick={() => setShowConfirmarEntrega(true)}>
        <Check size={22} />
        Entregado
      </button>
      {showConfirmarEntrega && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowConfirmarEntrega(false)}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={styles.modalTitle}>Entregar Orden</h3>

            <p className={styles.modalText}>
              ¿Esta seguro de marcar la orden de la mesa{" "}
              <strong>{mesaNumber}</strong>{" "}como Entregada?
            </p>


            <div className={styles.modalButtons}>
              <button
                className={styles.cancelButton}
                onClick={() => setShowConfirmarEntrega(false)}
              >
                Cancelar
              </button>

              <button
                className={styles.confirmButton}
                onClick={confirmEntrega}
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

export default CardEntrega;
