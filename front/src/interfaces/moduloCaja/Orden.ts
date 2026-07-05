export interface Topping {
  nombre: string;
  cantidad: 'sin' | 'normal' | 'extra';
}

export interface ProductoOrden {
  nombre: string;
  cantidad: number;
  toppings?: Topping[];
}

export interface Orden {
  folio: string;
  'num-mesa': string;
  mesero: string;
  hora: string;
  status: 'Pendiente' | 'En cocina' | 'Lista' | 'Entregada';
  subtotal: number;
  iva: number;
  total: number;
  productos: ProductoOrden[];
}