// components/Sidebar.tsx
import { useState } from "react";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  category: string;
  setCategory: (value: string) => void;
}

const Sidebar = ({ category, setCategory }: SidebarProps) => {
  return (
    <div className={`pt-3 ${styles.sidebar}`}>
      <div className={styles.titleDivider}>
        <h4 className={styles.subtitle + " mt-4 ms-4"}>RESTAURANTE</h4>
        <h2 className={styles.title + " ps-3 ms-2 mb-0"}>La Paz</h2>
        <h2 className={styles.title + " ps-3 ms-2 mt-0 mb-4"}>Ixtlan</h2>
      </div>

      <div className="">
        <p className={styles.subtitle + " mt-3 ms-4"}>OPERACIONES</p>

        <p
          className={`${styles.categoryItem} ${
            category === "Pendientes" ? styles.selectedItem : ""
          }
              `}
          onClick={() => setCategory("Pendientes")}
        >
          ⚠️ Pendientes
        </p>

        <p
          className={`${styles.categoryItem} ${
            category === "Por entregar" ? styles.selectedItem : ""
          }
              `}
          onClick={() => setCategory("Por entregar")}
        >
          🍽️ Entregar
        </p>

        <p
          className={`${styles.categoryItem} ${
            category === "Historial" ? styles.selectedItem : ""
          }
              `}
          onClick={() => setCategory("Historial")}
        >
          🕑 Historial
        </p>
      </div>

      <button className={styles.aboutButton}>
        <span className="me-3">ⓘ</span>Acerca de nosotros
      </button>
    </div>
  );
};

export default Sidebar;
