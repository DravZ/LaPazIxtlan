// layouts/MobileLayout.tsx
import { useState } from "react";
import styles from "./MobileLayout.module.css";
import MainContent from "../../../components/moduloCocina/MainContent/MainContent";
import BottomNav from "../../../components/moduloCocina/BottonNav/BottomNav";

const MobileLayout = () => {
  const [seccion, setSeccion] = useState("Entrantes");

  return (
    <>
      <div className={styles.container + " pb-0"}>
        <div className={styles.secondaryPanelContainer}>
          <div style={{ maxWidth: "500px", width: "100%" }} className="mx-auto">
            <div className={styles.screenContainer + " m-0 p-0"}>
              <MainContent seccion={seccion}/>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "500px" }}>
        <BottomNav currentView={seccion} setCurrentView={setSeccion} />
      </div>
    </>
  );
};

export default MobileLayout;
