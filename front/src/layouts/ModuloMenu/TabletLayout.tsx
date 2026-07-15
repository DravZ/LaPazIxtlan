// layouts/TabletLayout.tsx

import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/moduloMenu/Sidebar/Sidebar";
import MainContent from "../../components/moduloMenu/MainContent/MainContent";
import type { ProductMenu } from "../../interfaces/ModuloMenu/ProductMenu";
import SecondaryPanel from "../../components/moduloMenu/SecondaryPanel/SecondaryPanel";
import { useState, type Dispatch, type SetStateAction } from "react";

interface TabletLayoutProps {
  onSelectProduct: (product: number) => void;
  onOrder: () => void;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}
const TabletLayout = ({ onSelectProduct,
  onOrder,
  category,
  setCategory
 }: TabletLayoutProps) => {
  const navigate = useNavigate();

  const [view, setView] = useState<"main" | "panel">("main");

  return (
    <div className="container-fluid vh-100 overflow-hidden">
      <div className="row vh-100">
        <div className="col-3 border-end m-0 p-0">
          <Sidebar 
            category={category}
            setCategory={setCategory}
            view={view} setView={setView} />
        </div>

        <div className="col-9 m-0 p-0 h-100">
          {view === "main" ? (
            <MainContent 
              category={category}
              setCategory={setCategory}
              onSelectProduct={onSelectProduct} />
          ) : (
            <SecondaryPanel onOrder={onOrder} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TabletLayout;
