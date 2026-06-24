import Sidebar from "../../components/moduloMenu/Sidebar/Sidebar";
import MainContent from "../../components/moduloMenu/MainContent/MainContent";
import SecondaryPanel from "../../components/moduloMenu/SecondaryPanel/SecondaryPanel";

import type { ProductMenu } from "../../interfaces/ModuloMenu/ProductMenu";

interface DesktopLayoutProps {
  onSelectProduct: (product: ProductMenu) => void;
  onOrder: () => void;
}

const DesktopLayout = ({ onSelectProduct,
  onOrder
}: DesktopLayoutProps) => {
  return (
    <div className="container-fluid vh-100 overflow-hidden">
      <div className="row h-100">
        <div className="col-2 border-end p-0 h-100">
          <Sidebar />
        </div>

        <div className="col-7 p-0 h-100">
          <MainContent onSelectProduct={onSelectProduct} />
        </div>

        <div className="col-3 border-start p-0 h-100">
          <SecondaryPanel
            onOrder={() => {
              console.log("DesktopLayout");
              onOrder();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopLayout;
