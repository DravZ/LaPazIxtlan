import { AlertTriangle, Clock, UtensilsCrossed } from "lucide-react";
import styles from "./BottomNav.module.css";

interface Props {
  category: string;
  setCategory: (value: string) => void;
}

const BottomNav = ({ category, setCategory }: Props) => {
  return (
    <div className={styles.bottomNav}>
      {/* Pendientes */}
      <button
        onClick={() => setCategory("Pendientes")}
        className={`${styles.navButton} ${
          category === "Pendientes" ? styles.active : styles.inactive
        }`}
      >
        <span className={styles.label}>
          <span><AlertTriangle size={20} className="me-1"/></span> Pendientes</span>
      </button>

      {/* Por entregar */}
      <button
        onClick={() => setCategory("Por entregar")}
        className={`${styles.navButton} ${
          category === "Por entregar" ? styles.active : styles.inactive
        }`}
      >
        <span className={styles.label}>
          <UtensilsCrossed size={20} className="me-1"/>Entregar</span>
      </button>

      {/* Historial */}
      <button
        onClick={() => setCategory("Historial")}
        className={`${styles.navButton} ${
          category === "Historial" ? styles.active : styles.inactive
        }`}
      >
        <span className={styles.label}>
          <Clock size={20} className="me-1"/> Historial</span>
      </button>
    </div>
  );
};

export default BottomNav;
