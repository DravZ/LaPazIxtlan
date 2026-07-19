import { useEffect, useState } from "react";
import CompletadasCard from "./CompletadasCard/CompletadasCard";
import EntrantesCard from "./EntrantesCard/EntrantesCard";
import styles from "./MainContent.module.css";
import { getOrdenesPorEntregar } from "../../../controllers/orden.controller";

interface MainContentProps {
  seccion: string;
}

const MainContent = ({ seccion }: MainContentProps) => {

  const [ordenesEnPreparacion, setOrdenesEnPreparacion] = useState([]);

  useEffect(() => {
    const cargarOrdenes = async () => {
      try {
        const dataEnPrepacion = await getOrdenesPorEntregar();

        setOrdenesEnPreparacion(dataEnPrepacion);
        console.log("Órdenes en preparacion:", dataEnPrepacion);
      } catch (error) {
        console.error(error);
      }
    };

    cargarOrdenes();
  }, []);

  return (
    <div className={`p-3 ` + styles.container}>
      <div className="row mx-2 p-0">
        <div className="m-0 p-0 d-none d-md-block">
          <p className={"mt-2 mb-0 p-0 " + styles.subtitle}>MODO COCINA</p>
          <p className={"mt-0 mb-0 p-0 " + styles.title}>{seccion}</p>
        </div>

        <div className="m-0 p-0 d-block d-md-none">
          <p className={"mt-2 mb-0 p-0 " + styles.subtitle}>RESTAURANTE</p>
          <p className={"mt-0 mb-0 p-0 " + styles.title}>La Pax Ixtlan</p>
          <p className={"mt-0 mb-0 p-0 " + styles.subtitleCategory}>
            {seccion}
          </p>
        </div>
      </div>

      <div className="row mx-0 mt-4 p-0">
        {seccion === "Entrantes" && (
          <>
          {ordenesEnPreparacion.map((orden: any) => (
              <EntrantesCard
                key={orden.id_orden}
                idOrden={orden.id_orden}
                productos={orden.detalles}
                mesa={orden.mesa.id_mesa} 
                horaPedido={orden.hora_creacion}/>
            ))}
          </>
        )}

        {seccion === "Completadas" && (
          <>
            <CompletadasCard />
            <CompletadasCard />
            <CompletadasCard />
            <CompletadasCard />

          </>
        )}

      </div>
    </div>
  );
};

export default MainContent;
