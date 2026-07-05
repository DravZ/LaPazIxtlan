import React, { useState } from 'react';
import styles from './MainContent.module.css';
import type { Orden } from '../../../interfaces/moduloCaja/Orden';
import { OrdenActivaCard } from '../../../components/moduloCaja/OrdenActivaCard/OrdenActivaCard';

interface MainContentProps {
  selectedProduct: Orden | null;
  onSelectProduct: (orden: Orden) => void;
  isDesktop?: boolean
}

const INITIAL_ORDENES: Orden[] = [
  {
    folio: 's5',
    'num-mesa': 'Mesa 1',
    mesero: 'Carlos Mendoza',
    hora: '07:37 p.m.',
    status: 'Entregada',
    subtotal: 189.65,
    iva: 30.35,
    total: 220.00,
    productos: [
      { nombre: 'Nachos Artesanales', cantidad: 2, toppings: [{ nombre: 'Extra Queso', cantidad: 'extra' }] }
    ]
  },
  {
    folio: 's4',
    'num-mesa': 'Mesa 5',
    mesero: 'Ana Pérez',
    hora: '08:10 p.m.',
    status: 'Lista',
    subtotal: 300.00,
    iva: 48.00,
    total: 348.00,
    productos: [
      { nombre: 'Guacamole de la Casa', cantidad: 2 },
      { nombre: 'Quesadilla Especial', cantidad: 1, toppings: [{ nombre: 'Cebolla', cantidad: 'sin' }] },
      { nombre: 'Quesadilla Especial', cantidad: 1, toppings: [{ nombre: 'Cebolla', cantidad: 'sin' }] },
      { nombre: 'Quesadilla Especial', cantidad: 1, toppings: [{ nombre: 'Cebolla', cantidad: 'sin' }] },
      { nombre: 'Quesadilla Especial', cantidad: 1, toppings: [{ nombre: 'Cebolla', cantidad: 'sin' }] },
      { nombre: 'Quesadilla Especial', cantidad: 1, toppings: [{ nombre: 'Cebolla', cantidad: 'sin' }] },
      { nombre: 'Quesadilla Especial', cantidad: 1, toppings: [{ nombre: 'Cebolla', cantidad: 'sin' }] },
      { nombre: 'Quesadilla Especial', cantidad: 1, toppings: [{ nombre: 'Cebolla', cantidad: 'sin' }] },
      { nombre: 'Quesadilla Especial', cantidad: 1, toppings: [{ nombre: 'Cebolla', cantidad: 'sin' }] },
      { nombre: 'Quesadilla Especial', cantidad: 1, toppings: [{ nombre: 'Cebolla', cantidad: 'sin' }] },
      { nombre: 'Quesadilla Especial', cantidad: 1, toppings: [{ nombre: 'Cebolla', cantidad: 'sin' },
        { nombre: 'Cebolla', cantidad: 'sin' },
        { nombre: 'Cebolla', cantidad: 'sin' }
      ] }
    ]
  },
  {
    folio: 's3',
    'num-mesa': 'Mesa 2',
    mesero: 'Luis García',
    hora: '08:24 p.m.',
    status: 'En cocina',
    subtotal: 614.65,
    iva: 98.35,
    total: 713.00,
    productos: [
      { nombre: 'Enchiladas Rojas', cantidad: 3 },
      { nombre: 'Café de Olla', cantidad: 3, toppings: [{ nombre: 'Piloncillo', cantidad: 'normal' }] }
    ]
  },
  {
    folio: 's2',
    'num-mesa': 'Mesa 7',
    mesero: 'Ana Pérez',
    hora: '08:33 p.m.',
    status: 'Pendiente',
    subtotal: 275.00,
    iva: 44.00,
    total: 319.00,
    productos: [
      { nombre: 'Hamburguesa Ixtlan', cantidad: 1 },
      { nombre: 'Limonada Natural', cantidad: 2 }
    ]
  },
  {
    folio: 's2',
    'num-mesa': 'Mesa 7',
    mesero: 'Ana Pérez',
    hora: '08:33 p.m.',
    status: 'Pendiente',
    subtotal: 275.00,
    iva: 44.00,
    total: 319.00,
    productos: [
      { nombre: 'Hamburguesa Ixtlan', cantidad: 1 },
      { nombre: 'Limonada Natural', cantidad: 2 }
    ]
  },
  {
    folio: 's2',
    'num-mesa': 'Mesa 7',
    mesero: 'Ana Pérez',
    hora: '08:33 p.m.',
    status: 'Pendiente',
    subtotal: 275.00,
    iva: 44.00,
    total: 319.00,
    productos: [
      { nombre: 'Hamburguesa Ixtlan', cantidad: 1 },
      { nombre: 'Limonada Natural', cantidad: 2 }
    ]
  },
  {
    folio: 's2',
    'num-mesa': 'Mesa 7',
    mesero: 'Ana Pérez',
    hora: '08:33 p.m.',
    status: 'Pendiente',
    subtotal: 275.00,
    iva: 44.00,
    total: 319.00,
    productos: [
      { nombre: 'Hamburguesa Ixtlan', cantidad: 1 },
      { nombre: 'Limonada Natural', cantidad: 2 }
    ]
  }
];
export const MainContent: React.FC<MainContentProps> = ({ 
selectedProduct, onSelectProduct, isDesktop }) => {
  const [ordenes, setOrdenes] = useState<Orden[]>(INITIAL_ORDENES);

  const handleControlOrden = (folio: string, statusActual: Orden['status']) => {
    console.log(`Orden controlada: ${folio} con estatus: ${statusActual}`);
  };

  console.log("Pantall: " + (isDesktop ? "Escritorio" : "No escritorio"))

  return (
    <div className={styles.sectionContainer + " row m-0 p-3 d-flex"}>
      <div className={styles.headerRow}>
        <div className={styles.titleBlock}>
          <h2 className={styles.sectionTitle}>Gestión de Órdenes</h2>
          <p className={styles.sectionSubtitle}>Órdenes por Atender - Primero en entrar, primero en cobrar</p>
        </div>
        <div className={styles.badgeCount}>
          {ordenes.length} órdenes activas
        </div>
      </div>

      <div className={styles.cardsList}>
        {ordenes.map((orden, index) => (
          <OrdenActivaCard
            key={orden.folio + "-" + index}
            orden={orden}
            numeroSecuencial={index + 1}
            onAccion={handleControlOrden}
            onClickCard={onSelectProduct} // Delegamos la selección directamente al Layout padre
            isSelected={selectedProduct?.folio === orden.folio} // Leemos del estado global
          />
        ))}
      </div>
    </div>
  );
};