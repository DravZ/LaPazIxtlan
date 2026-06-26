import { useState } from "react";

import MainContent from "../../../components/meseros/Mesero/MainContent/MainContent";
import BottomNav from "../../../components/meseros/Mesero/BottomNav/BottomNav";
import type { ProductMenu } from "../../../interfaces/ModuloMenu/ProductMenu";

import styles from "./MobileLayout.module.css";

interface MobileLayoutProps {
  onSelectProduct: (product: ProductMenu) => void;
}

const MobileLayout = ({ onSelectProduct }: MobileLayoutProps) => {
  const [category, setCategory] = useState("Pendientes");

  return (
    <>
      <div className={styles.container + " pb-0"}>
        <div style={{ maxWidth: "500px", width: "100%" }} className="mx-auto">
          {/* NUEVA CABECERA MÓVIL DIRECTO DESDE LA IMAGEN */}
          <div className="pt-4 px-4 pb-2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className={`${styles.brandSubtitle} m-0 p-0`}>RESTAURANTE</p>
                <h2 className={`${styles.brandTitle} m-0 p-0`}>
                  La Paz Ixtlan
                </h2>
              </div>
              <span className={styles.badgeMesero}>Mesero</span>
            </div>
            {/* Categoría debajo en formato grande */}
            <h1 className={`${styles.categoryTitle} mt-3 mb-1`}>{category}</h1>
          </div>

          <div className={styles.screenContainer + " m-0 p-0"}>
            <MainContent category={category} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "500px" }}>
        <BottomNav category={category} setCategory={setCategory} />
      </div>
    </>
  );
};

export default MobileLayout;
