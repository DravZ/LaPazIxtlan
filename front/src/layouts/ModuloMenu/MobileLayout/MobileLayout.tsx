// layouts/MobileLayout.tsx

import { useState } from "react";

import MainContent from "../../../components/moduloMenu/menu/MainContent/MainContent";
import SecondaryPanel from "../../../components/moduloMenu/SecondaryPanel/SecondaryPanel";
import BottomNav from "../../../components/moduloMenu/BottonNav/BottomNav";
import type { ProductMenu } from "../../../interfaces/ModuloMenu/ProductMenu";

import styles from "./MobileLayout.module.css";

interface MobileLayoutProps {
  onSelectProduct: (product: ProductMenu) => void;
}
const MobileLayout = ({ onSelectProduct }: MobileLayoutProps) => {
  const [view, setView] = useState<"main" | "panel">("main");

  return (
    <>
      <div className={styles.container + " pb-0"}>
        {view === "main" && (
          <div style={{ maxWidth: "500px", width: "100%" }} className="mx-auto">
            <div className={styles.screenContainer + " m-0 p-0"}>
              <MainContent onSelectProduct={onSelectProduct} />
            </div>
          </div>
        )}

        {view === "panel" && <SecondaryPanel />}
      </div>

      <div style={{ maxWidth: "500px" }}>
        <BottomNav currentView={view} setCurrentView={setView} />
      </div>
    </>
  );
};

export default MobileLayout;
