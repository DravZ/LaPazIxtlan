// layouts/MobileLayout.tsx

import { useState, type Dispatch, type SetStateAction } from "react";

import MainContent from "../../../components/moduloMenu/MainContent/MainContent";
import SecondaryPanel from "../../../components/moduloMenu/SecondaryPanel/SecondaryPanel";
import BottomNav from "../../../components/moduloMenu/BottonNav/BottomNav";
import type { ProductMenu } from "../../../interfaces/ModuloMenu/ProductMenu";

import styles from "./MobileLayout.module.css";

interface MobileLayoutProps {
  onSelectProduct: (product: number) => void;
  onOrder: () => void;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}
const MobileLayout = ({ onSelectProduct,
  onOrder,
  category,
  setCategory
 }: MobileLayoutProps) => {
  const [view, setView] = useState<"main" | "panel">("main");

  return (
    <>
      <div className={styles.container + " pb-0"}>
        {view === "main" && (
          <div style={{ maxWidth: "500px", width: "100%" }} className="mx-auto">
            <div className={styles.screenContainer + " m-0 p-0"}>
              <MainContent 
                category= {category}
                setCategory={setCategory}
              onSelectProduct={onSelectProduct} />
            </div>
          </div>
        )}

        {view === "panel" && 
          <div className={styles.secondaryPanelContainer}>
            <SecondaryPanel onOrder={onOrder} />
          </div>}
      </div>

      <div style={{ maxWidth: "500px" }}>
        <BottomNav currentView={view} setCurrentView={setView} />
      </div>
    </>
  );
};

export default MobileLayout;
