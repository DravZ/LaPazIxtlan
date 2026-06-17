// layouts/MobileLayout.tsx

import { useState } from "react";

import MainContent from "../components/menu/MainContent/MainContent";
import SecondaryPanel from "../components/SecondaryPanel";
import BottomNav from "../components/BottomNav";

const MobileLayout = () => {
  const [view, setView] =
    useState<"main" | "panel">("main");

  return (
    <>
      <div className="pb-5">

        {view === "main" && (
  <div
    style={{ maxWidth: "500px", width: "100%" }}
    className="mx-auto"
  >
    <MainContent />
  </div>
)}

        {view === "panel" && <SecondaryPanel />}

      </div>

      <BottomNav
        currentView={view}
        setCurrentView={setView}
      />
    </>
  );
};

export default MobileLayout;