import React from 'react';
import styles from './OrdenActivaCard.module.css';
import type { Orden } from '../../../interfaces/moduloCaja/Orden'; 

interface OrdenActivaCardProps {
  orden: Orden;
  numeroSecuencial: number;
  onAccion: (folio: string, statusActual: Orden['status']) => void;
  onClickCard: (orden: Orden) => void;
  isSelected: boolean; // Nueva prop añadida para saber si está seleccionada
}

export const OrdenActivaCard: React.FC<OrdenActivaCardProps> = ({ 
  orden, 
  numeroSecuencial, 
  onAccion, 
  onClickCard,
  isSelected 
}) => {
  const getStatusBadgeClass = (status: Orden['status']) => {
    switch (status) {
      case 'Pendiente': return styles.badgePendiente;
      case 'En cocina': return styles.badgeCocina;
      case 'Lista': return styles.badgeLista;
      case 'Entregada': return styles.badgeEntregada;
      default: return '';
    }
  };

  const renderBotonAccion = () => {
    if (orden.status === 'Lista') {
      return (
        <button 
          className={`${styles.btnAccion} ${styles.btnProceder}`} 
          onClick={(e) => {
            e.stopPropagation();
            onAccion(orden.folio, orden.status);
          }}
        >
          Proceder al Cobro
        </button>
      );
    }

    return (
      <button 
        className={`${styles.btnAccion} ${styles.btnEnProceso}`} 
        onClick={(e) => {
          e.stopPropagation();
          onAccion(orden.folio, orden.status);
        }}
      >
        En proceso
      </button>
    );
  };

  return (
    <div 
      className={`
        ${styles.card} 
        ${isSelected ? styles.cardListaBorder : ''}
      `}
      onClick={() => onClickCard(orden)}
      style={{ cursor: 'pointer' }}
    >
      {/* Columna 1: Círculo Indicador Numérico */}
      <div className={styles.secuencialWrapper}>
        <div className={`${styles.circleIndicator}`}>
          {numeroSecuencial}
        </div>
      </div>

      {/* Columna 2: Contenido Principal de la Orden */}
      <div className={styles.mainInfo}>
        <div className={styles.topMeta}>
          <span className={styles.mesaTitle}>{orden['num-mesa']}</span>
          <span className={`${styles.statusBadge} ${getStatusBadgeClass(orden.status)}`}>
            {orden.status}
          </span>
          <span className={styles.metaText}>🕒 {orden.hora}</span>
          <span className={styles.metaText}>• Mesero: {orden.mesero}</span>
        </div>

        {/* Listado de Productos Formateados */}
        <div className={styles.productosContainer}>
          {orden.productos.map((prod, idx) => {
            const tieneToppings = prod.toppings && prod.toppings.length > 0;
            
            const toppingsString = tieneToppings
              ? `Toppings: ${prod.toppings!.map(t => `${t.nombre} (${t.cantidad})`).join(', ')}`
              : '';

            return (
              <div key={idx} className={styles.itemProductoRow}>
                <p className={styles.productoText}>
                  <span className={styles.cantidadHighlight}>{prod.cantidad}×</span> {prod.nombre}
                </p>
                {tieneToppings && <p className={styles.toppingsLegend}>{toppingsString}</p>}
              </div>
            );
          })}
        </div>

        {/* Precios e IVA */}
        <div className={styles.priceContainer}>
          <span className={styles.totalText}>${orden.total.toFixed(2)} MXN</span>
          <span className={styles.ivaText}>c/IVA (Sub: ${orden.subtotal.toFixed(2)})</span>
        </div>
      </div>

      {/* Columna 3: Botón de Control Lateral Izquierdo */}
      <div className={styles.actionsSide}>
        {renderBotonAccion()}
        <span className={styles.folioSubtext}>{orden.folio}</span>
      </div>

    </div>
  );
};