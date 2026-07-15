// components/MainContent.tsx
import CardProduct from "../CardProduct/CardProduct";
import styles from "./MainContent.module.css";
import type { ProductMenu } from "../../../interfaces/ModuloMenu/ProductMenu";
import { Info, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { getCategorias } from "../../../controllers/categorias.controller";
import { getAllMenu } from "../../../controllers/menu.controller";

interface MainContentProps {
  onSelectProduct: (product: number) => void;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}

const MainContent = ({ onSelectProduct,
  category,
  setCategory
 }: MainContentProps) => {
  const [categoryList, setCategoryList] = useState<any[]>([]);

  const [menu, setMenu] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const categorias = await getCategorias();
        const menu = await getAllMenu();


        setCategoryList(categorias);
        setMenu(menu);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    cargarCategorias();
  }, []);

  return (
    <div className={`p-3 ` + styles.container}>
      <div className="row mx-2 p-0">
        <div className="m-0 p-0 d-none d-md-block">
          <p className={"mt-2 mb-0 p-0 " + styles.subtitle}>EXPLORANDO</p>
          <p className={"mt-0 mb-0 p-0 " + styles.title}>{category}</p>
        </div>

        <div className="m-0 p-0 d-block d-md-none">
          <p className={"mt-2 mb-0 p-0 " + styles.subtitle}>RESTAURANTE</p>
          <p className={"mt-0 mb-0 p-0 " + styles.title}>La Pax Ixtlan</p>
          <p className={"mt-0 mb-0 p-0 " + styles.subtitleCategory}>
            {category}
          </p>

          <div className="d-flex align-items-center mt-2">
            <div className={styles.about}
              onClick={
                () => navigate("/about")
              }>
              <Info size={15} className="me-1" />
              Acerca de nosotros
            </div>

            <div className={`${styles.profile} ms-auto`}>
              <User size={20} />
            </div>
          </div>
        </div>

        <div className={styles.banner + " mx- mt-3 p-0"}>
          <img
            src="./menu/banner.jpg"
            alt="Sabores de Oaxaca"
            className={styles.image}
          />

          <div className={styles.overlay}></div>

          <div className={styles.content}>
            <span className={styles.subtitleBanner}>Cocina de leña</span>

            <h1 className={styles.titleBanner}>Sabores de Oaxaca</h1>
          </div>
        </div>

        <div className={styles.slider + " d-flex d-lg-none mt-3"}>
          <div
            className={`${category == "Todos" ? styles.selectedItem : styles.item}`}
            onClick={() => {
              setCategory("Todos");
            }}
          >
            Todos
          </div>
          {
            categoryList.map((c) => (
              <div
                key={c.id_categoria}
                className={
                  category === c.nombre_categoria
                    ? styles.selectedItem
                    : styles.item
                }
                onClick={() => setCategory(c.nombre_categoria)}
              >
                {c.nombre_categoria}
              </div>
            ))
          }
        </div>

        <div className="row mt-0 mb-0 mx-0 p-0">
          {
            menu.map((m) => (
              (m.nombre_categoria == category) || (category == "Todos") ? (
                <div
                  key={m.id_producto}
                  className="col-lg-4 col-md-6 col-12 p-0">
                  <CardProduct
                    productName={m.nombre_producto}
                    description={m.descripcion}
                    price={m.precio}
                    img={m.imagen_url}
                    hasToppings={false}
                    onClick={() => {
                      console.log(m.id_producto)
                      onSelectProduct(m.id_producto)}} />
                </div>
              ) :
                null
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default MainContent;
