import { CheckCircle2, ChefHat } from "lucide-react";
import styles from "./BottomNav.module.css";
import { useEffect, useState } from "react";
import { getOrdenesEnPreparación } from "../../../controllers/orden.controller";
import { useOrdenesSocket } from "../../../hooks/useOrdenesSocket";

interface Props {
  currentView: string
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
}

const BottomNav = ({
  currentView,
  setCurrentView,
}: Props) => {
  const [ordenesEnPreparacion, setOrdenesEnPreparacion] = useState(0);

  const cargarOrdenes = async () => {
    try {
      const dataEnPrepacion = await getOrdenesEnPreparación();

      setOrdenesEnPreparacion(dataEnPrepacion.length);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarOrdenes();
  }, []);

  useOrdenesSocket(() => {

    cargarOrdenes();
  });
  return (

    <div className={styles.bottomNav}>
      {/* Menú */}
      <button
        onClick={() =>
          setCurrentView("Entrantes")
        }
        className={`${styles.navButton} ${currentView === "Entrantes"
          ? styles.active
          : styles.inactive
          }`}
      >


        <div
          className={
            styles.cartIconContainer
          }
        >
          <ChefHat size={22} className="mb-1 me-1" />

          {ordenesEnPreparacion == 0 ? null :
            <span className={styles.badge}>
              {ordenesEnPreparacion}
            </span>}
        </div>

        <span className={styles.label}>
          Entrantes
        </span>
      </button>

      {/* Pedido */}
      <button
        onClick={() =>
          setCurrentView("Completadas")
        }
        className={`${styles.navButton} ${currentView === "Completadas"
          ? styles.active
          : styles.inactive
          }`}
      >
        <div
          className={
            styles.cartIconContainer
          }
        >
          <CheckCircle2 size={22} className="mb-1 me-1" />


        </div>

        <span className={styles.label}>
          Completadas
        </span>
      </button>
    </div>
  );
};

export default BottomNav;