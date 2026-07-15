// components/Sidebar.tsx
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import styles from "./Sidebar.module.css";
import { Info, Menu, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCategorias } from "../../../controllers/categorias.controller";
import { useOrderMenu } from "../../../context/moduloMenu/OrderMenuContext";

interface SidebarProps {
  view?: "main" | "panel";
  setView?: React.Dispatch<React.SetStateAction<"main" | "panel">>;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}

const Sidebar = ({
  view,
  setView,
  category,
  setCategory
}: SidebarProps) => {

  const [categoryList, setCategoryList] = useState<any[]>([]);
  const navigate = useNavigate();

  const { orden } = useOrderMenu();

  const totalItems = useMemo(() => {
    return orden.reduce(
      (total: number, item: any) => total + item.cantidad,
      0
    );
  }, [orden]);

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const categorias = await getCategorias();

        setCategoryList(categorias);

        console.log(categorias);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    cargarCategorias();
  }, []);

  return (
    <div className={`pt-3 ${styles.sidebar}`}>
      <div className={styles.titleDivider}>
        <h4 className={styles.subtitle + " mt-4 ms-4"}>RESTAURANTE</h4>
        <h2 className={styles.title + " ps-3 ms-2 mb-0"}>La Paz</h2>
        <h2 className={styles.title + " ps-3 ms-2 mt-0 mb-4"}>Ixtlan</h2>
      </div>

      {view && setView ? (
        <div className="d-block d-lg-none">
          <p className={styles.subtitle + " mt-3 ms-4"}>NAVEGACIÓN</p>

          <p
            className={`${styles.categoryItem}
              ${view === "main" ? styles.selectedItem : ""}`}
            onClick={() => setView("main")}
          >
            <Menu size={20} /> Menú
          </p>

          <p
            className={`${styles.categoryItem}
              ${view === "panel" ? styles.selectedItem : ""}`}
            onClick={() => setView("panel")}
          >
            <span className={styles.cartContainer}>
              <ShoppingCart size={20} />

              {totalItems > 0 && (
                <span className={styles.badge}>
                  {totalItems}
                </span>
              )}
            </span>

            Pedido
          </p>
        </div>
      ) : (
        <></>
      )}

      <div className="d-none d-lg-block">
        <p className={styles.subtitle + " mt-3 ms-4"}>CATEGORÍAS</p>

        <p
          className={`${styles.categoryItem}
              ${category === "Todos" ? styles.selectedItem : ""}`}
          onClick={() => setCategory("Todos")}
        >
          Todas
        </p>

        {categoryList.map((c) => (
          <p
            key={c.id_categoria}
            className={`${styles.categoryItem}
              ${category === c.nombre_categoria ? styles.selectedItem : ""}`}
            onClick={() => setCategory(c.nombre_categoria)}
          >
            {c.nombre_categoria}
          </p>
        ))}
      </div>

      <button
        onClick={() => navigate("/about")}
        className={
          styles.aboutButton +
          " d-flex align-content-center justify-content-center align-items-center"
        }
      >
        <span className={styles.aboutButtonIcon}>
          <Info size={24} />
        </span>

        <span className={styles.aboutButtonText}>
          Acerca de nosotros
        </span>
      </button>
    </div>
  );
};

export default Sidebar;