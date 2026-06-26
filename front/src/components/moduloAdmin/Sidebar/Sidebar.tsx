// components/Sidebar.tsx
import styles from "./Sidebar.module.css";
import { BarChart2, ClipboardList, Receipt, Settings2 } from "lucide-react";

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
          className={`${styles.categoryItem} ${selected === "Estadisticas" ? styles.selectedItem : ""
            }`}
          onClick={() => setSelected("Estadísticas")}
        >
          <span className={styles.itemContent}>
            <BarChart2 size={18} />
            <span>Estadísticas</span>
          </span>
        </p>

        <p
          className={`${styles.categoryItem} ${selected === "Gestion" ? styles.selectedItem : ""
            }`}
          onClick={() => setSelected("Gestión")}
        >
          <span className={styles.itemContent}>
            <Settings2 size={18} />
            <span>Gestión</span>
          </span>
        </p>
        <p
          className={`${styles.categoryItem} ${selected === "Historial" ? styles.selectedItem : ""
            }`}
          onClick={() => setSelected("Historial")}
        >
          <span className={styles.itemContent}>
            <ClipboardList size={18} />
            <span>Historial</span>
          </span>
        </p>
        <p
          className={`${styles.categoryItem} ${selected === "Corte" ? styles.selectedItem : ""
            }`}
          onClick={() => setSelected("Corte")}
        >
          <span className={styles.itemContent}>
            <Receipt size={18} />
            <span>Corte</span>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
