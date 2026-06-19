// components/MainContent.tsx
import styles from "./CardOrden.module.css";
import { Plus } from "lucide-react";
import type { ProductMenu } from "../../../../interfaces/ProductMenu";
interface Topping {
  name: string;
  quantity: number;
}

interface CardOrdenProps {
  mesaNumber: number;
  timer: number;
  price: number;
  confirm: boolean;
  products: ProductMenu[];
  onClick?: () => void;
}

const CardOrden = ({}: CardOrdenProps) => {
  return <div className="row mx-2 mt-4 px-0"></div>;
};

export default CardOrden;
