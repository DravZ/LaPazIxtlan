// components/MainContent.tsx
import CardOrden from "../CardOrden/CardOrden";
import styles from "./MainContent.module.css";
import CardEntrega from "../CardEntrega/CardEntrega";
import CardHistorial from "../CardHistorial/CardHistorial";
import { useEffect, useState } from "react";
import { getAllOrdenes, getOrdenesPendientes, getOrdenesPorEntregar } from "../../../../controllers/orden.controller";
import { socket } from "../../../../services/socket.service";
import { useOrdenesSocket } from "../../../../hooks/useOrdenesSocket";
import { useNotification } from "../../../../context/notifications/NotificationContext";

interface MainContentProps {
  category: string;
}

const MainContent = ({ category }: MainContentProps) => {

  const [ordenesPendientes, setOrdenesPendientes] = useState([]);
  const [ordenesPorEntregar, setOrdenesPorEntregar] = useState([]);
  const [ordenesHistorial, setOrdenesHistorial] = useState([]);

  const { showNotification } = useNotification();

  const cargarOrdenes = async () => {
    try {
      const [dataPendientes, dataEntregar, dataHistorial] =
        await Promise.all([
          getOrdenesPendientes(),
          getOrdenesPorEntregar(),
          getAllOrdenes(),
        ]);

      setOrdenesPendientes(dataPendientes);
      setOrdenesPorEntregar(dataEntregar);
      setOrdenesHistorial(dataHistorial);

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
        // Reproducir sonido
        const audio = new Audio("/sounds/notification.mp3");
        audio.play().catch(() => { });

        // Tu hook de notificaciones
        showNotification({
          type: "warning",
          title: "Nueva orden!",
          description: "Hay una nueva orden. Revise la sección de Pendientes"
        });
        break;

      case "actualizada":

        switch (evento.estado) {

          case "En preparación":
            break;

          case "Lista":
            // Reproducir sonido
            const audio = new Audio("/sounds/notification.mp3");
            audio.play().catch(() => { });

            // Tu hook de notificaciones
            showNotification({
              type: "warning",
              title: "Nueva orden lista para entregar!",
              description: "Hay una nueva orden lista para entregar. " + 
              "Revise la sección de Entregar"
            });
            break;

          case "Entregada":
            break;

          case "Descartada":
            break;
        }

        break;

      case "eliminada":
        // Tu hook de notificaciones
        showNotification({
          type: "warning",
          title: "Orden Cancelada",
          description: "Se ha cancelado una orden"
        });
        break;
    }

  });

  return (
    <div className={`p-3 ${styles.container}`}>
      <div className="row mx-2 p-0">
        <div className="m-0 p-0 d-none d-md-block">
          <p className={"mt-2 mb-0 p-0 " + styles.subtitle}>MODO MESERO</p>
          <p className={"mt-0 mb-0 p-0 " + styles.title}>{category}</p>
        </div>
        {category === "Pendientes" && (
          <>
            {ordenesPendientes.map((o: any) => (
              <div
                key={o.id_orden}
                className="col-xl-6 col-lg-6 col-md-12 mb-4"
              >
                <CardOrden
                  idOrden={o.id_orden}
                  products={o.detalles}
                  confirm={false}
                  mesaNumber={o.mesa.numero_mesa}
                  price={o.total}
                  timer={o.hora_creacion}
                />
              </div>
            ))}
          </>
        )}

        {category === "Por entregar" && (
          <>
            {ordenesPorEntregar.map((o: any) => (
              <div
                key={o.id_orden}
                className="col-xl-6 col-lg-6 col-md-12 mb-4"
              >
                <CardEntrega
                  id_orden={o.id_orden}
                  products={o.detalles}
                  confirm={false}
                  mesaNumber={o.mesa.numero_mesa}
                  price={o.total}
                  timer={o.hora_creacion}
                />
              </div>
            ))}
          </>
        )}

        {category === "Historial" && (
          <>
            {ordenesHistorial.map((o: any) => (
              <div
                key={o.id_orden}
                className="col-xl-6 col-lg-6 col-md-12 mb-4"
              >
                <CardHistorial
                  idOrden={o.id_orden}
                  products={o.detalles}
                  confirm={false}
                  mesaNumber={o.mesa.numero_mesa}
                  price={o.total}
                  timer={o.hora_creacion}
                  status={o.estado}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MainContent;
