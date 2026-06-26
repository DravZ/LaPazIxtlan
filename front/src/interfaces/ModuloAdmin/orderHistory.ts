export type OrderStatus = 'pendiente' | 'en-cocina' | 'lista' | 'descartada';

export interface OrderProduct {
  id: string;
  name: string;
  quantity: number;
}

export interface Order {
  id: string;
  tableNumber: string;
  timestamp: string; // ISO String o formato "10:16 a.m."
  products: OrderProduct[];
  observations: string;
  status: OrderStatus;
}