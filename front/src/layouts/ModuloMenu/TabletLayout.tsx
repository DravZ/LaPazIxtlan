// layouts/TabletLayout.tsx

import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/moduloMenu/Sidebar/Sidebar";
import MainContent from "../../components/moduloMenu/MainContent/MainContent";
import type { ProductMenu } from "../../interfaces/ModuloMenu/ProductMenu";
import SecondaryPanel from "../../components/moduloMenu/SecondaryPanel/SecondaryPanel";
import { useState } from "react";

interface TabletLayoutProps {
  onSelectProduct: (product: ProductMenu) => void;
  onOrder: () => void;
}
const TabletLayout = ({ onSelectProduct,
  onOrder
 }: TabletLayoutProps) => {
  const navigate = useNavigate();

  const [view, setView] = useState<"main" | "panel">("main");

  return (
    <div className="container-fluid vh-100 overflow-hidden">
      <div className="row vh-100">
        <div className="col-3 border-end m-0 p-0">
          <Sidebar view={view} setView={setView} />
        </div>

        <div className="col-9 m-0 p-0 h-100">
          {view === "main" ? (
            <MainContent onSelectProduct={onSelectProduct} />
          ) : (
            <SecondaryPanel onOrder={onOrder} />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col-3 border-end">
          <Sidebar view={view} setView={setView} />

          <button
            className="btn btn-primary w-100 mt-3"
            onClick={() => navigate("/panel")}
          >
            Abrir Panel
          </button>
        </div>

        <div className="col-9">
          <MainContent onSelectProduct={onSelectProduct} />
        </div>
      </div>
    </div>
  );
};

export default TabletLayout;
