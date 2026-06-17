// components/Sidebar.tsx
import { useState } from 'react';
import styles from './Sidebar.module.css'
import { Menu, ShoppingCart } from 'lucide-react';

interface SidebarProps {
  view?: "main" | "panel";
  setView?: React.Dispatch<
    React.SetStateAction<"main" | "panel">
  >;
}
const Sidebar = ({
  view,
  setView,
}: SidebarProps) => {
  const [selected, setSelected] =
    useState("");
  return (
    <div
      className={`pt-3 ${styles.sidebar}`}
    >
      <div className={styles.titleDivider}>
        <h4 className={styles.subtitle + " mt-4 ms-4"}>RESTAURANTE</h4>
        <h2 className={styles.title + " ps-3 ms-2 mb-0"}>La Paz</h2>
        <h2 className={styles.title + " ps-3 ms-2 mt-0 mb-4"}>Ixtlan</h2>
      </div>
      {(view && setView) ? (<div className='d-block d-lg-none'>
        <p className={styles.subtitle + " mt-3 ms-4"}>
          NAVEGACIÓN
        </p>
        <p
          className={`${styles.categoryItem}
    ${view === "main"
              ? styles.selectedItem
              : ""
            }`}
          onClick={() => setView("main")}
        >
          <Menu size={20} /> Menú
        </p>

        <p
          className={`${styles.categoryItem}
    ${view === "panel"
              ? styles.selectedItem
              : ""
            }`}
          onClick={() => setView("panel")}
        >
          <span className={styles.cartContainer}>
            <ShoppingCart size={20} />

            <span className={styles.badge}>
              1
            </span>
          </span>

          Pedido
        </p>
      </div>) : (<></>)}
      <div className='d-none d-lg-block'>
        <p className={styles.subtitle + " mt-3 ms-4"}>
          CATEGORÍAS
        </p>

        <p className={`${styles.categoryItem}
              ${selected === "Entradas"
            ? styles.selectedItem
            : ""
          }`}
          onClick={() =>
            setSelected("Entradas")
          }>
          🌿 Entradas
        </p>

        <p
          className={`${styles.categoryItem}
              ${selected === "Hamburguesas"
              ? styles.selectedItem
              : ""
            }`}
          onClick={() =>
            setSelected("Hamburguesas")
          }
        >
          🍔 Hamburguesas
        </p>

        <p className={`${styles.categoryItem}
              ${selected === "Especiales"
            ? styles.selectedItem
            : ""
          }`}
          onClick={() =>
            setSelected("Especiales")
          }>
          ⭐ Especiales
        </p>

        <p className={`${styles.categoryItem}
              ${selected === "Bebidas"
            ? styles.selectedItem
            : ""
          }`}
          onClick={() =>
            setSelected("Bebidas")
          }>
          🥤 Bebidas
        </p>
      </div>

      <button className={styles.aboutButton}>
        <span className='me-3'>ⓘ</span>Acerca de nosotros
      </button>
    </div>
  );
};

export default Sidebar;