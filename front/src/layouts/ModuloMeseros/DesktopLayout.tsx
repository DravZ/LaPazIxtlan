import Sidebar from "../../components/meseros/Sidebar/Sidebar";
import MainContent from "../../components/meseros/Mesero/MainContent/MainContent";

import type { ProductMenu } from "../../interfaces/ModuloMenu/ProductMenu";

interface DesktopLayoutProps {
  onSelectProduct: (product: ProductMenu) => void;
}

const DesktopLayout = ({ onSelectProduct }: DesktopLayoutProps) => {
  return (
    <div className="container-fluid vh-100 overflow-hidden">
      <div className="row h-100">
        <div className="col-2 border-end p-0 h-100">
          <Sidebar />
        </div>

        <div className="col-10 p-0 h-100">
          <MainContent />
        </div>
      </div>
    </div>
  );
};

export default DesktopLayout;
