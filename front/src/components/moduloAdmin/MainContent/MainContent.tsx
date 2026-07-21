import CortePage from "../../../pages/moduloAdmin/CortePage/CortePage";
import EstadisticasPage from "../../../pages/moduloAdmin/EstadisticasPage/EstadisticasPage";
import GestionPage from "../../../pages/moduloAdmin/GestionPage/GestionPage";
import { HistorialPage } from "../../../pages/moduloAdmin/HistorialPage/HistorialPage";
import LogOutBtn from "../../logOut/LogOutBtn";
import styles from "./MainContent.module.css";

interface MainContentProps {
  seccion: string;
}

const MainContent = ({ seccion }: MainContentProps) => {

  return (
    <div className={`p-3 ` + styles.container}>
      <div className="row d-flex mx-2 p-0 justify-content-between align-items-center">
        <div className="m-0 p-0 d-none d-md-block w-auto">
          <p className={"mt-2 mb-0 p-0 " + styles.subtitle}>MODO COCINA</p>
          <p className={"mt-0 mb-0 p-0 " + styles.title}>{seccion}</p>
        </div>

        <div className="m-0 p-0 d-block d-md-none w-auto">
          <p className={"mt-2 mb-0 p-0 " + styles.subtitle}>RESTAURANTE</p>
          <p className={"mt-0 mb-0 p-0 " + styles.title}>La Pax Ixtlan</p>
          <p className={"mt-0 mb-0 p-0 " + styles.subtitleCategory}>
            {seccion}
          </p>
        </div>

        <LogOutBtn/>
      </div>

      <div className="row mx-0 mt-4 p-0">
        {seccion === "Estadísticas" && (
          <EstadisticasPage/>
        )}

        {seccion === "Gestión" && (
          <>
            <GestionPage/>
          </>
        )}
        {seccion === "Historial" && (
          <>
            <HistorialPage/>
          </>
        )}
        {seccion === "Corte" && (
          <>
            <CortePage/>
          </>
        )}
      </div>
    </div>
  );
};

export default MainContent;
