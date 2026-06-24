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
