import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import styles from "./ConfirmOrderModal.module.css";
import { useEffect, useMemo, useState } from "react";
import { useOrderMenu } from "../../../context/moduloMenu/OrderMenuContext";
import { useParams } from "react-router-dom";
import { useNotification } from "../../../context/notifications/NotificationContext";
import { createOrder } from "../../../controllers/orden.controller";

interface ConfirmOrderModalProps {
  isOpen: boolean;
  stage: 1 | 2;

  setStage: (
    stage: 1 | 2
  ) => void;

  onClose: () => void;
}

const ConfirmOrderModal = ({
  isOpen,
  stage,
  setStage,
  onClose,
}: ConfirmOrderModalProps) => {

  const {
    orden,
    calculatePrice,
    clearOrder
  } = useOrderMenu();

  const { id } = useParams();

  const { showNotification } = useNotification();

  const total = useMemo(() => {
    return orden.reduce(
      (total: number, item: any) =>
        total + calculatePrice(item),
      0
    );
  }, [orden, calculatePrice]);

  const pedidoTemporal = useMemo(() => {

    return {
      id_mesa: Number(id ?? 0),
      detalles: orden.map((producto: any) => ({

        id_producto: producto.id_producto,

        cantidad_solicitada: producto.cantidad,

        toppings: producto.toppings
          .map((t: any) => ({

            id_topping: t.id_topping,

            estado:
              t.quantity === 1
                ? "normal"
                : (t.quantity === 2
                  ? "extra"
                  : "sin")

          }))

      }))
    };

  }, [orden, id]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
    >
      <div className={styles.modal}>

        {stage === 1 && (
          <>
            <div className={styles.iconCircle}>
              <ShoppingCart size={36} />
            </div>

            <h2 className={styles.title}>
              ¿Estás seguro de ordenar?
            </h2>

            <p className={styles.total}>
              Total:
              <span>${total.toFixed(2)}</span>
            </p>

            <div className={styles.actions}>
              <button
                className={styles.cancelBtn}
                onClick={onClose}
              >
                Cancelar
              </button>

              <button
                className={styles.confirmBtn}
                onClick={async () => {

                  try {

                    await createOrder(pedidoTemporal);

                    console.log(pedidoTemporal);
                    clearOrder();

                    setStage(2);

                  } catch (error: any) {

                    onClose();

                    showNotification({
                      type: "error",
                      title: "Error al realizar la orden",
                      description:
                        error?.response?.data?.message ??
                        "Ocurrió un error inesperado. Inténtalo nuevamente."
                    });

                  }
                }}
              >
                Sí, Ordenar
              </button>
            </div>
          </>
        )}

        {stage === 2 && (
          <>
            <div
              className={
                styles.successCircle
              }
            ><Check
                size={42}
                className={styles.checkIcon}
              />
            </div>

            <h2 className={styles.title}>
              ¡Orden Recibida!
            </h2>

            <p
              className={
                styles.description
              }
            >
              Un mesero acudirá a tu mesa
              en un momento para confirmar
              tu pedido personalmente.
            </p>

            <button
              className={styles.confirmBtn_2}
              onClick={onClose}
            >
              Volver al Menú
            </button>
          </>
        )}

      </div>
    </div >
  );
};

export default ConfirmOrderModal;
