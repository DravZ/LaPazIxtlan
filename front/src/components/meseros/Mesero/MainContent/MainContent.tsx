// components/MainContent.tsx
import CardOrden from "../CardOrden/CardOrden";
import styles from "./MainContent.module.css";
import type { MeseroMesas } from "../../../../interfaces/MeseroMesas";
import { useState } from "react";
import { Info, User } from "lucide-react";

interface MainContentProps {
  onSelectProduct: (mesas: MeseroMesas) => void;
}

const MainContent = () => {
  const [category, setCategory] = useState("Pendientes");

  const mesas: MeseroMesas = {
    mesaNumber: 1,
    timer: 150,
    price: 145,
    confirm: false,
    products: [],
  };
  const mesas2: MeseroMesas = {
    mesaNumber: 1,
    timer: 150,
    price: 145,
    confirm: false,
    products: [],
  };

  return <div className={`p-3 ` + styles.container}></div>;
};

export default MainContent;
