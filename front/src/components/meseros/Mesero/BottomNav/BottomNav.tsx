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
        <span className={styles.label}>⚠️ Pendientes</span>
      </button>

      {/* Por entregar */}
      <button
        onClick={() => setCategory("Por entregar")}
        className={`${styles.navButton} ${
          category === "Por entregar" ? styles.active : styles.inactive
        }`}
      >
        <span className={styles.label}>🍽️ Entregar</span>
      </button>

      {/* Historial */}
      <button
        onClick={() => setCategory("Historial")}
        className={`${styles.navButton} ${
          category === "Historial" ? styles.active : styles.inactive
        }`}
      >
        <span className={styles.label}>🕑 Historial</span>
      </button>
    </div>
  );
};

export default BottomNav;
