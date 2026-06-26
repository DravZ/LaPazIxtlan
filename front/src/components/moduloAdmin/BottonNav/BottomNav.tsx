import { BarChart2, ClipboardList, Receipt, Settings2 } from "lucide-react";
import styles from "./BottomNav.module.css";

interface Props {
  currentView: string
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
}

const BottomNav = ({
  currentView,
  setCurrentView,
}: Props) => {
  return (
    <div className={styles.bottomNav}>
      {/* Menú */}
      <button
        onClick={() =>
          setCurrentView("Estadísticas")
        }
        className={`${styles.navButton} ${
          currentView === "Estadísticas"
            ? styles.active
            : styles.inactive
        }`}
      >
        

        <div
          className={
            styles.cartIconContainer
          }
        >
          <BarChart2 size={22} className="mb-1 me-1"/>
        </div>
      </button>

      {/* Pedido */}
      <button
        onClick={() =>
          setCurrentView("Gestión")
        }
        className={`${styles.navButton} ${
          currentView === "Gestión"
            ? styles.active
            : styles.inactive
        }`}
      >
        <div
          className={
            styles.cartIconContainer
          }
        >
          <Settings2 size={22} className="mb-1 me-1"/>
          {/*
          <span className={styles.badge}>
            1
          </span>
          */}
          
        </div>
      </button>

      <button
        onClick={() =>
          setCurrentView("Historial")
        }
        className={`${styles.navButton} ${
          currentView === "Historial"
            ? styles.active
            : styles.inactive
        }`}
      >
        

        <div
          className={
            styles.cartIconContainer
          }
        >
          <ClipboardList size={22} className="mb-1 me-1"/>
        </div>
      </button>
      <button
        onClick={() =>
          setCurrentView("Corte")
        }
        className={`${styles.navButton} ${
          currentView === "Corte"
            ? styles.active
            : styles.inactive
        }`}
      >
        

        <div
          className={
            styles.cartIconContainer
          }
        >
          <Receipt size={22} className="mb-1 me-1"/>
        </div>
      </button>
    </div>
  );
};

export default BottomNav;