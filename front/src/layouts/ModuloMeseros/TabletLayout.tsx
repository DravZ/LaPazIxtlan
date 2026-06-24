// layouts/TabletLayout.tsx
import { useState } from "react";
import Sidebar from "../../components/meseros/Sidebar/Sidebar";
import MainContent from "../../components/meseros/Mesero/MainContent/MainContent";

const TabletLayout = () => {
  const [category, setCategory] = useState("Pendientes");
  return (
    <div className="container-fluid vh-100 overflow-hidden">
      <div className="row vh-100">
        <div className="col-3 border-end m-0 p-0">
          <Sidebar category={category} setCategory={setCategory} />
        </div>

        <div className="col-9 m-0 p-0 h-100">
          <MainContent category={category} />
        </div>
      </div>
    </div>
  );
};

export default TabletLayout;
