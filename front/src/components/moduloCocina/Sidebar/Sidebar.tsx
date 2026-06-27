// components/Sidebar.tsx
import { useState } from "react";
import styles from "./Sidebar.module.css";
import { CheckCircle2, ChefHat, Info, Menu, ShoppingCart } from "lucide-react";

interface SidebarProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar = ({ selected, setSelected }: SidebarProps) => {
  return (
    <div className={`pt-3 ${styles.sidebar}`}>
      <div className={styles.titleDivider}>
        <h4 className={styles.subtitle + " mt-4 ms-4"}>RESTAURANTE</h4>
        <h2 className={styles.title + " ps-3 ms-2 mb-0"}>La Paz</h2>
        <h2 className={styles.title + " ps-3 ms-2 mt-0 mb-4"}>Ixtlan</h2>
      </div>
      <div className="d-block d-lg-block">
        <p className={styles.subtitle + " mt-3 ms-4"}>CATEGORÍAS</p>

        <p
          className={`${styles.categoryItem} ${selected === "Entrantes" ? styles.selectedItem : ""
            }`}
          onClick={() => setSelected("Entrantes")}
        >
          <span className={styles.itemContent}>
            <ChefHat size={18} />
            <span>Entrantes</span>
          </span>

          <span className={styles.notifier}>1</span>
        </p>

        <p
          className={`${styles.categoryItem} ${selected === "Completadas" ? styles.selectedItem : ""
            }`}
          onClick={() => setSelected("Completadas")}
        >
          <span className={styles.itemContent}>
            <CheckCircle2 size={18} />
            <span>Completadas</span>
          </span>

          <span className={styles.notifier}>1</span>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
