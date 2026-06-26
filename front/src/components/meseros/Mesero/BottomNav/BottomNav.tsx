import styles from "./BottomNav.module.css";
import { ClipboardList, ShoppingCart, Clock } from "lucide-react";

interface Props {
  category: string;
  setCategory: (view: string) => void;
  badgePendientes?: number;
  badgeEntregar?: number;
}

const BottomNav = ({
  category,
  setCategory,
  badgePendientes = 1,
  badgeEntregar = 0,
}: Props) => {
  return (
    <div className={styles.bottomNav}>
      {/* PENDIENTES */}
      <button
        onClick={() => setCategory("Pendientes")}
        className={`${styles.navButton} ${
          category === "Pendientes" ? styles.active : styles.inactive
        }`}
      >
        <div className={styles.cartIconContainer}>
          <ClipboardList size={22} />
          {badgePendientes > 0 && (
            <span className={styles.badge}>{badgePendientes}</span>
          )}
        </div>
        <span className={styles.label}>Pendientes</span>
      </button>

      {/* POR ENTREGAR */}
      <button
        onClick={() => setCategory("Por entregar")}
        className={`${styles.navButton} ${
          category === "Por entregar" ? styles.active : styles.inactive
        }`}
      >
        <div className={styles.cartIconContainer}>
          <ShoppingCart size={22} />
          {badgeEntregar > 0 && (
            <span className={styles.badge}>{badgeEntregar}</span>
          )}
        </div>
        <span className={styles.label}>Entregar</span>
      </button>

      {/* HISTORIAL */}
      <button
        onClick={() => setCategory("Historial")}
        className={`${styles.navButton} ${
          category === "Historial" ? styles.active : styles.inactive
        }`}
      >
        <div className={styles.cartIconContainer}>
          <Clock size={22} />
        </div>
        <span className={styles.label}>Historial</span>
      </button>
    </div>
  );
};

export default BottomNav;
