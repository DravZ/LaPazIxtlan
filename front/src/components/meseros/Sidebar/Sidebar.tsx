import { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { ClipboardList, ShoppingCart, Clock } from "lucide-react";
import { getOrdenesPendientes, getOrdenesPorEntregar } from "../../../controllers/orden.controller";
import { useOrdenesSocket } from "../../../hooks/useOrdenesSocket";

interface SidebarProps {
  category: string;
  setCategory: (value: string) => void;
  badgePendientes?: number;
  badgeEntregar?: number;
}

const Sidebar = ({
  category,
  setCategory,
  badgePendientes = 1,
  badgeEntregar = 0,
}: SidebarProps) => {

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
    <div className={`pt-3 ${styles.sidebar}`}>
      <div className={styles.titleDivider}>
        <h4 className={styles.subtitle + " mt-4 ms-4"}>RESTAURANTE</h4>
        <h2 className={styles.title + " ps-3 ms-2 mb-0"}>La Paz</h2>
        <h2 className={styles.title + " ps-3 ms-2 mt-0 mb-4"}>Ixtlan</h2>
      </div>

      <div>
        <p className={styles.subtitle + " mt-3 ms-4"}>OPERACIONES</p>

        {/* PENDIENTES */}
        <div
          className={`${styles.categoryItem} ${category === "Pendientes" ? styles.selectedItem : ""
            }`}
          onClick={() => setCategory("Pendientes")}
        >
          <div className={styles.iconContainer}>
            <ClipboardList size={20} />
            {ordenesPendientes > 0 && (
              <span className={styles.badge}>{ordenesPendientes}</span>
            )}
          </div>
          Pendientes
        </div>

        {/* ENTREGAR */}
        <div
          className={`${styles.categoryItem} ${category === "Por entregar" ? styles.selectedItem : ""
            }`}
          onClick={() => setCategory("Por entregar")}
        >
          <div className={styles.iconContainer}>
            <ShoppingCart size={20} />
            {ordenesPorEntregar > 0 && (
              <span className={styles.badge}>{ordenesPorEntregar}</span>
            )}
          </div>
          Entregar
        </div>

        {/* HISTORIAL */}
        <div
          className={`${styles.categoryItem} ${category === "Historial" ? styles.selectedItem : ""
            }`}
          onClick={() => setCategory("Historial")}
        >
          <div className={styles.iconContainer}>
            <Clock size={20} />
          </div>
          Historial
        </div>
      </div>

      <button className={styles.aboutButton}>
        <span className="me-3">ⓘ</span>Acerca de nosotros
      </button>
    </div>
  );
};

export default Sidebar;
