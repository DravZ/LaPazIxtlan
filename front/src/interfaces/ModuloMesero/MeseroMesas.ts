import type { ProductMenu } from "../ModuloMenu/ProductMenu";

export interface MeseroMesas {
  mesaNumber: number;
  timer: number;
  price: number;
  confirm: boolean;
  products: OrderItem[];
}

export interface OrderItem {
  quantity: number;
  product: ProductMenu;
}
