import type { ProductMenu } from "./menu/ProductMenu";

export interface MeseroMesas {
  mesaNumber: number;
  timer: number;
  price: number;
  confirm: boolean;
  products: ProductMenu[];
}
