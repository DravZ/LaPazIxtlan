import { useMemo } from "react";
import { useOrderMenu } from "../../../context/moduloMenu/OrderMenuContext";
import styles from "./BottomNav.module.css";

interface Props {
  currentView: "main" | "panel";
  setCurrentView: (
    view: "main" | "panel"
  ) => void;
}

const BottomNav = ({
  currentView,
  setCurrentView,
}: Props) => {

  const { orden } = useOrderMenu();

  const totalItems = useMemo(() => {
    return orden.reduce(
      (total: number, item: any) => total + item.cantidad,
      0
    );
  }, [orden]);

  return (
    <div className={styles.bottomNav}>
      {/* Menú */}
      <button
        onClick={() =>
          setCurrentView("main")
        }
        className={`${styles.navButton} ${
          currentView === "main"
            ? styles.active
            : styles.inactive
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
          />
        </svg>

        <span className={styles.label}>
          Menú
        </span>
      </button>

      {/* Pedido */}
      <button
        onClick={() =>
          setCurrentView("panel")
        }
        className={`${styles.navButton} ${
          currentView === "panel"
            ? styles.active
            : styles.inactive
        }`}
      >
        <div
          className={
            styles.cartIconContainer
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>

          {totalItems > 0 && (
            <span className={styles.badge}>
              {totalItems}
            </span>
          )}
        </div>

        <span className={styles.label}>
          Pedido
        </span>
      </button>
    </div>
  );
};

export default BottomNav;