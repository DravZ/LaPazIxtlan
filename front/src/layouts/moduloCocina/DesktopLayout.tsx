import { useState } from "react";
import MainContent from "../../components/moduloCocina/MainContent/MainContent";
import Sidebar from "../../components/moduloCocina/Sidebar/Sidebar";

const DesktopLayout = () => {
  const [seccion, setSeccion] = useState("Entrantes");

  return (
    <div className="container-fluid vh-100 overflow-hidden">
      <div className="row h-100">
        <div className="col-3 col-lg-2  border-end p-0 h-100">
          <Sidebar
            selected={seccion}
            setSelected={setSeccion}
          />
        </div>

        <div className="col-9 col-lg-10 p-0 h-100">
          <MainContent seccion={seccion} />
        </div>
      </div>
    </div>
  );
};

export default DesktopLayout;
