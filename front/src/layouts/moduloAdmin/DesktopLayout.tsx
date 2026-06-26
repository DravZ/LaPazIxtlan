import { useState } from "react";
import Sidebar from "../../components/moduloAdmin/Sidebar/Sidebar";
import MainContent from "../../components/moduloAdmin/MainContent/MainContent";

const DesktopLayout = () => {
  const [seccion, setSeccion] = useState("Estadísticas");

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
