import { useEffect, useState } from "react";
import CompletadasCard from "./CompletadasCard/CompletadasCard";
import EntrantesCard from "./EntrantesCard/EntrantesCard";
import styles from "./MainContent.module.css";
import { getOrdenesEnPreparación, getOrdenesPorEntregar, getOrdenesPreparadas_Dia } from "../../../controllers/orden.controller";
import { useOrdenesSocket } from "../../../hooks/useOrdenesSocket";
import { useNotification } from "../../../context/notifications/NotificationContext";

interface MainContentProps {
  seccion: string;
}

const MainContent = ({ seccion }: MainContentProps) => {

  const [ordenesEnPreparacion, setOrdenesEnPreparacion] = useState([]);
  const [ordenesPreparadas, setOrdenesPreparadas] = useState([])
  const { showNotification } = useNotification();

  const cargarOrdenes = async () => {
    try {
      const dataEnPrepacion = await getOrdenesEnPreparación();
      const dataPreparadas = await getOrdenesPreparadas_Dia();

      setOrdenesEnPreparacion(dataEnPrepacion);
      setOrdenesPreparadas(dataPreparadas)
      console.log("Órdenes en despachadas:", dataPreparadas);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarOrdenes();
  }, []);

  useOrdenesSocket((evento) => {

    cargarOrdenes();

    switch (evento.tipo) {

      case "creada":
        break;

      case "actualizada":

        switch (evento.estado) {

          case "En Preparación":
            // Reproducir sonido
            const audio = new Audio("/sounds/notification.mp3");
            audio.play().catch(() => { });

            // Tu hook de notificaciones
            showNotification({
              type: "warning",
              title: "Nueva orden!",
              description: "Orden lista para preparar. Revisa la sección Entrentes"
            });
            break;

          case "Lista":
            break;

          case "Entregada":
            break;

          case "Descartada":
            break;
        }

        break;

      case "eliminada":
        break;
    }

  });

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
                horaPedido={orden.hora_confirmacion} />
            ))}
          </>
        )}

        {seccion === "Completadas" && (
          <>
            {ordenesPreparadas.map((orden: any) => (
              <CompletadasCard
                key={orden.id_orden}
                idOrden={orden.id_orden}
                productos={orden.detalles}
                mesa={orden.mesa.id_mesa}
                horaDespachado={orden.hora_lista} />
            ))}
            

          </>
        )}

      </div>
    </div>
  );
};

export default MainContent;
