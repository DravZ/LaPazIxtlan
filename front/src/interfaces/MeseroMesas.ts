import type { ProductMenu } from "./ProductMenu";

export interface MeseroMesas {
  mesaNumber: number;
  timer: number;
  price: number;
  confirm: boolean;
  products: ProductMenu[];
}
