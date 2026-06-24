// components/MainContent.tsx
import CardOrden from "../CardOrden/CardOrden";
import styles from "./MainContent.module.css";
import type { MeseroMesas } from "../../../../interfaces/ModuloMesero/MeseroMesas";
import CardEntrega from "../CardEntrega/CardEntrega";
import CardHistorial from "../CardHistorial/CardHistorial";
import { useState } from "react";
import { Info, User } from "lucide-react";

interface MainContentProps {
  category: string;
}

const MainContent = ({ category }: MainContentProps) => {
  const mesas: MeseroMesas = {
    mesaNumber: 1,
    timer: 10,
    price: 250,
    confirm: false,
    products: [
      {
        quantity: 2,
        product: {
          productName: "Hamburguesa Especial",
          description: "Carne de res con queso",
          price: 120,
          hasToppings: true,
          toppings: [
            {
              name: "Cebolla",
              quantity: 1,
            },
            {
              name: "Tomate",
              quantity: 1,
            },
          ],
          img: "/menu/hamburguesa.jpg",
        },
      },
      {
        quantity: 1,
        product: {
          productName: "Papas",
          description: "Papas a la francesa",
          price: 50,
          hasToppings: false,
          img: "/menu/papas.jpg",
        },
      },
    ],
  };
  const mesas2: MeseroMesas = {
    mesaNumber: 2,
    timer: 150,
    price: 145,
    confirm: false,
    products: [],
  };

  const mesaEntrega: MeseroMesas = {
    mesaNumber: 3,
    timer: 150,
    price: 145,
    confirm: false,
    products: [],
  };

  const mesaEntrega2: MeseroMesas = {
    mesaNumber: 3,
    timer: 150,
    price: 145,
    confirm: false,
    products: [],
  };

  return (
    <div className={`p-3 ${styles.container}`}>
      <div className="row mx-2 p-0">
        <div className="m-0 p-0 d-none d-md-block">
          <p className={"mt-2 mb-0 p-0 " + styles.subtitle}>MODO MESERO</p>
          <p className={"mt-0 mb-0 p-0 " + styles.title}>{category}</p>
        </div>
        {category === "Pendientes" && (
          <>
            <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
              <CardOrden {...mesas} />
            </div>

            <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
              <CardOrden {...mesas2} />
            </div>
          </>
        )}

        {category === "Por entregar" && (
          <>
            <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
              <CardEntrega {...mesas} />
            </div>

            <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
              <CardEntrega {...mesaEntrega} />
            </div>
          </>
        )}

        {category === "Historial" && (
          <>
            <CardHistorial {...mesas} />

            <CardHistorial {...mesaEntrega} />
          </>
        )}
      </div>
    </div>
  );
};

export default MainContent;
