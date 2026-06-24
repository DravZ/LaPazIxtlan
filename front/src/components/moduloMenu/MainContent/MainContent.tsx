// components/MainContent.tsx
import CardProduct from "../CardProduct/CardProduct";
import styles from "./MainContent.module.css";
import type { ProductMenu } from "../../../interfaces/ModuloMenu/ProductMenu";
import { useState } from "react";
import { Info, User } from "lucide-react";

interface MainContentProps {
  onSelectProduct: (product: ProductMenu) => void;
}

const MainContent = ({ onSelectProduct }: MainContentProps) => {
  const [category, setCategory] = useState("Todos");

  const tacos: ProductMenu = {
    productName: "Tacos al Pastor",
    description:
      "3 tacos de cerdo marinado en achiote con piña, cilantro y cebolla blanca.",
    price: 145,
    hasToppings: false,
    img: "/menu/tacos.jpg",
  };
  const tacos2: ProductMenu = {
    productName: "Tacos al Pastor",
    description:
      "3 tacos de cerdo marinado en achiote con piña, cilantro y cebolla blanca.",
    price: 145,
    hasToppings: true,
    toppings: [
      {
        name: "catsup",
        quantity: 1,
      },
      {
        name: "tomate",
        quantity: 1,
      },
    ],
    img: "/menu/tacos.jpg",
  };

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
            <div className={styles.about}>
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
          <div
            className={`${category == "Entradas" ? styles.selectedItem : styles.item}`}
            onClick={() => {
              setCategory("Entradas");
            }}
          >
            Entradas
          </div>
          <div
            className={`${category == "Hamburguesas" ? styles.selectedItem : styles.item}`}
            onClick={() => {
              setCategory("Hamburguesas");
            }}
          >
            Hamburguesas
          </div>
          <div
            className={`${category == "Especiales" ? styles.selectedItem : styles.item}`}
            onClick={() => {
              setCategory("Especiales");
            }}
          >
            Especiales
          </div>
          <div
            className={`${category == "Bebidas" ? styles.selectedItem : styles.item}`}
            onClick={() => {
              setCategory("Bebidas");
            }}
          >
            Bebidas
          </div>
        </div>

        <div className="row mt-0 mb-0 mx-0 p-0">
          <div className="col-lg-4 col-md-6 col-12 p-0">
            <CardProduct {...tacos2} onClick={() => onSelectProduct(tacos2)} />
          </div>
          <div className="col-lg-4 col-md-6 col-12 p-0">
            <CardProduct
              productName="Tacos al Pastor"
              description="3 tacos de cerdo marinado en achiote con piña, cilantro y cebolla blanca."
              price={145}
              hasToppings={false}
              img="/menu/tacos.jpg"
            />{" "}
          </div>
          <div className="col-lg-4 col-md-6 col-12 p-0">
            <CardProduct
              productName="Tacos al Pastor"
              description="3 tacos de cerdo marinado en achiote con piña, cilantro y cebolla blanca."
              price={145}
              hasToppings={false}
              img="/menu/tacos.jpg"
            />
          </div>
          {/*Hace un for en el que cree una variable tipo productMenu en cada ciclo 
          o alamacenarlos en un arreglo y enviarlo en el onClicl
          */}

          <div className="col-lg-4 col-md-6 col-12 p-0">
            <CardProduct
              productName="Tacos al Pastor"
              description="3 tacos de cerdo marinado en achiote con piña, cilantro y cebolla blanca."
              price={145}
              hasToppings={false}
              img="/menu/tacos.jpg"
              onClick={() => onSelectProduct(tacos)}
            />
          </div>
          <div className="col-lg-4 col-md-6 col-12 p-0">
            <CardProduct
              productName="Tacos al Pastor"
              description="3 tacos de cerdo marinado en achiote con piña, cilantro y cebolla blanca."
              price={145}
              hasToppings={false}
              img="/menu/tacos.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
