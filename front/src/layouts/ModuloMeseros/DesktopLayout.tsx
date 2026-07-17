import { useState } from "react";

import Sidebar from "../../components/meseros/Sidebar/Sidebar";
import MainContent from "../../components/meseros/Mesero/MainContent/MainContent";

import type { ProductMenu } from "../../interfaces/ModuloMenu/ProductMenu";

const DesktopLayout = () => {
  const [category, setCategory] = useState("Pendientes");

  return (
    <div className="container-fluid vh-100 overflow-hidden">
      <div className="row h-100">
        <div className="col-2 border-end p-0 h-100">
          <Sidebar category={category} setCategory={setCategory} />
        </div>

        <div className="col-10 p-0 h-100">
          <MainContent category={category} />
        </div>
      </div>
    </div>
  );
};

export default DesktopLayout;
