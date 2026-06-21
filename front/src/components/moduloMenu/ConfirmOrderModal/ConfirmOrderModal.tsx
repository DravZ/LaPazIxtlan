import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import styles from "./ConfirmOrderModal.module.css";
import { useEffect, useState } from "react";

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
              <span> $145</span>
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
                onClick={() =>
                  setStage(2)
                }
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
    </div>
  );
};

export default ConfirmOrderModal;
