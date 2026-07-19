import { useEffect, useState } from "react";
import { getAllOrdenes, getOrdenesPendientes, getOrdenesPorEntregar } from "../../../../controllers/orden.controller";
import styles from "./BottomNav.module.css";
import { ClipboardList, ShoppingCart, Clock } from "lucide-react";
import { useOrdenesSocket } from "../../../../hooks/useOrdenesSocket";

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
  const [ordenesPendientes, setOrdenesPendientes] = useState(0);
  const [ordenesPorEntregar, setOrdenesPorEntregar] = useState(0);

  const cargarOrdenes = async () => {
    try {
      const dataPendientes = await getOrdenesPendientes();
      const dataEntregar = await getOrdenesPorEntregar();

      setOrdenesPendientes(dataPendientes.length);
      setOrdenesPorEntregar(dataEntregar.length);

      console.log("Órdenes pendientes:", dataPendientes.length);
      console.log("Órdenes por entregar:", dataEntregar.length);
    } catch (error) {
      console.error(error);
    }
  };

  useOrdenesSocket(() => {

    cargarOrdenes();

  });

  useEffect(() => {
    cargarOrdenes();
  }, []);
  return (
    <div className={styles.bottomNav}>
      {/* PENDIENTES */}
      <button
        onClick={() => setCategory("Pendientes")}
        className={`${styles.navButton} ${category === "Pendientes" ? styles.active : styles.inactive
          }`}
      >
        <div className={styles.cartIconContainer}>
          <ClipboardList size={22} />
          {ordenesPendientes > 0 && (
            <span className={styles.badge}>{ordenesPendientes}</span>
          )}
        </div>
        <span className={styles.label}>Pendientes</span>
      </button>

      {/* POR ENTREGAR */}
      <button
        onClick={() => setCategory("Por entregar")}
        className={`${styles.navButton} ${category === "Por entregar" ? styles.active : styles.inactive
          }`}
      >
        <div className={styles.cartIconContainer}>
          <ShoppingCart size={22} />
          {ordenesPorEntregar > 0 && (
            <span className={styles.badge}>{ordenesPorEntregar}</span>
          )}
        </div>
        <span className={styles.label}>Entregar</span>
      </button>

      {/* HISTORIAL */}
      <button
        onClick={() => setCategory("Historial")}
        className={`${styles.navButton} ${category === "Historial" ? styles.active : styles.inactive
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
