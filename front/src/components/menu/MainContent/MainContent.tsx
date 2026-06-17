// components/MainContent.tsx
import { useState } from "react";
import CardProduct from "../CardProduct/CardProduct";
import styles from "./MainContent.module.css";
import type { ProductMenu } from "../../../interfaces/ProductMenu";
import ProductModal from "../../ProductModal/ProductModal";

const MainContent = () => {
  const [selectedProduct, setSelectedProduct] =
    useState<ProductMenu | null>(null);

  const tacos: ProductMenu = {
    productName: "Tacos al Pastor",
    description:
      "3 tacos de cerdo marinado en achiote con piña, cilantro y cebolla blanca.",
    price: "145",
    hasToppings: false,
    img: "/menu/tacos.jpg"
  };

  return (
    <div className={`p-3 ` + styles.container}>
      <div className="row mx-2 p-0">
        <p className={"mt-2 mb-0 p-0 " + styles.subtitle}>EXPLORANDO</p>
        <p className={"mt-0 mb-0 p-0 " + styles.title}>Hamburguesas</p>

        <div className={styles.banner + " mx- mt-3 p-0"}>
          <img
            src="./menu/banner.jpg"
            alt="Sabores de Oaxaca"
            className={styles.image}
          />

          <div className={styles.overlay}></div>

          <div className={styles.content}>
            <span className={styles.subtitleBanner}>
              Cocina de leña
            </span>

            <h1 className={styles.titleBanner}>
              Sabores de Oaxaca
            </h1>
          </div>
        </div>

        <div className="row mt-0 mb-0 mx-0 p-0">
          <div className="col-lg-4 col-md-6 col-12 p-0">
            <CardProduct productName="Tacos al Pastor"
              description="3 tacos de cerdo marinado en achiote con piña, cilantro y cebolla blanca."
              price="145"
              hasToppings={false}
              img="/menu/tacos.jpg"
              onClick={() =>
                setSelectedProduct(tacos) //(producto)
              }
            />
          </div>
          <div className="col-lg-4 col-md-6 col-12 p-0">
            <CardProduct productName="Tacos al Pastor"
              description="3 tacos de cerdo marinado en achiote con piña, cilantro y cebolla blanca."
              price="145"
              hasToppings={false}
              img="/menu/tacos.jpg"
            />          </div>
          <div className="col-lg-4 col-md-6 col-12 p-0">
            <CardProduct productName="Tacos al Pastor"
              description="3 tacos de cerdo marinado en achiote con piña, cilantro y cebolla blanca."
              price="145"
              hasToppings={false}
              img="/menu/tacos.jpg"
            />
          </div>
          {/*Hace un for en el que cree una variable tipo productMenu en cada ciclo 
          o alamacenarlos en un arreglo y enviarlo en el onClicl
          */
          }

          <div className="col-lg-4 col-md-6 col-12 p-0">
            <CardProduct productName="Tacos al Pastor"
              description="3 tacos de cerdo marinado en achiote con piña, cilantro y cebolla blanca."
              price="145"
              hasToppings={false}
              img="/menu/tacos.jpg"
              onClick={() =>
                setSelectedProduct(tacos) //(producto)
              }
            />
          </div>
          <div className="col-lg-4 col-md-6 col-12 p-0">
            <CardProduct productName="Tacos al Pastor"
              description="3 tacos de cerdo marinado en achiote con piña, cilantro y cebolla blanca."
              price="145"
              hasToppings={false}
              img="/menu/tacos.jpg"
            />
          </div>
        </div>
      </div>
      <ProductModal
        product={selectedProduct}
        onClose={() =>
          setSelectedProduct(null)
        }
      />
    </div>
  );
};

export default MainContent;