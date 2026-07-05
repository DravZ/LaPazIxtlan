import React, { useState } from 'react';
import { CreditCard, DollarSign, Receipt } from 'lucide-react';
import styles from './SecondaryPanel.module.css';
import type { Orden } from '../../../interfaces/moduloCaja/Orden';

interface SecondaryPanelProps {
  selectedProduct: Orden | null;
  onConfirmarPago: (folio: string, metodo: 'efectivo' | 'tarjeta') => void;
}

export const SecondaryPanel: React.FC<SecondaryPanelProps> = ({ selectedProduct, onConfirmarPago }) => {
  const [metodoPago, setMetodoPago] = useState<'efectivo' | 'tarjeta'>('tarjeta');

  // ESTADO 1: No hay producto seleccionado (Ocupa el 100% del alto)
  if (!selectedProduct) {
    return (
      <div className={styles.emptyState}>
        <div className="ms-3 mt-3 mb-3 me-0 p-0">
          <p className={`${styles.subtitle} ms-3 mb-0 p-0`}>GESTIÓN DE VENTAS - RF-030</p>
          <p className={`${styles.title} ms-3 mt-0 p-0`}>Ticket de Venta</p>
        </div>
        <hr className="w-100 m-0" />
        <div className={styles.emptyCenterContent}>
          <div className={styles.emptyContent}>
            <Receipt size={48} className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>Selecciona una orden</h3>
            <p className={styles.emptySubtitle}>
              Haz clic sobre cualquier tarjeta de la lista para desglosar sus productos y proceder con el cobro correspondiente.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ESTADO 2: Orden seleccionada con datos activos
  return (
    <div className={styles.containerA}>
      {/****************************** BLOQUE 1 (Tamaño natural) */}
      <div className={styles.bloqueHeader + " ms-3 mt-3 mb-0 me-0 p-0"}>
        <p className={styles.subtitle + " mb-0 p-0"}>GESTIÓN DE VENTAS - RF-030</p>
        <p className={styles.title + " mt-0 p-0"}>Ticket - {selectedProduct['num-mesa']}</p>
      </div>
      <hr className="mx-4 my-2" />

      {/****************************** BLOQUE 2 (Ocupa el restante con scroll) */}
      <div className={styles.dataTicketContainer + " px-4 py-2"}>
        {/* Cabecera del ticket / desglose */}
        <div className={styles.header}>
          <div className={styles.metaLeft}>
            <span className={styles.folioText}>{selectedProduct['num-mesa']} -
              {selectedProduct.hora}</span>
            <p className={styles.folioText + " m-0"}>
              <b>Mesero:</b> {selectedProduct.mesero}
              <b className='ms-3'>Folio: </b> #{selectedProduct.folio}
            </p>
          </div>
        </div>

        <hr className={styles.divider} />

        {/* Lista Desglozada de Productos e Items */}
        {/* Lista Desglozada de Productos e Items */}
<div className={styles.productosList}>
  {selectedProduct.productos.map((prod, idx) => {
    const tieneToppings = prod.toppings && prod.toppings.length > 0;
    const toppingsString = tieneToppings
      ? `Toppings: ${prod.toppings!.map(t => `${t.nombre} (${t.cantidad})`).join(', ')}`
      : '';

    return (
      /* ¡CORREGIDO! El key va en el elemento raíz de la iteración */
      <div key={`${selectedProduct.folio}-prod-${idx}`}>
        <div className={styles.productDiv + ' row d-flex p-2 m-0'}>
          <div className={styles.productoItem + " col-9 m-0"}>
            <div className={styles.prodMainRow}>
              <span className={styles.prodNombre}>
                <strong className={styles.prodCantidad}>{prod.cantidad}×</strong> {prod.nombre}
              </span>
            </div>
            {tieneToppings && <p className={styles.toppingsLegend}>{toppingsString}</p>}
          </div>
          <div className={styles.productPrice + ' col-3 m-0'}>
            $170
          </div>
        </div>
      </div>
    );
  })}
</div>

        <hr className={styles.divider} />

        {/* Selector de Método de Pago Integrado */}
        <div className={styles.paymentSelectorContainer}>
          <span className={styles.sectionLabel}>Método de Pago</span>
          <div className={styles.methodGrid}>
            <button
              type="button"
              className={`${styles.methodBtn} ${metodoPago === 'tarjeta' ? styles.methodBtnActive : ''}`}
              onClick={() => setMetodoPago('tarjeta')}
            >
              <CreditCard size={18} />
              Tarjeta
            </button>
            <button
              type="button"
              className={`${styles.methodBtn} ${metodoPago === 'efectivo' ? styles.methodBtnActive : ''}`}
              onClick={() => setMetodoPago('efectivo')}
            >
              <DollarSign size={18} />
              Efectivo
            </button>
          </div>
        </div>

        {/* Bloque Final de Precios Totales */}
        <div className={styles.financialSummary}>
          <div className={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>${selectedProduct.subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>IVA (16%):</span>
            <span>${selectedProduct.iva.toFixed(2)}</span>
          </div>
          <hr />
          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span>Total:</span>
            <span className={styles.total}>${selectedProduct.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/****************************** BLOQUE 3 (Tamaño natural al fondo) */}
      <div className={styles.bloqueFooter + " p-4"}>
        <button
          className={styles.btnConfirmar}
          onClick={() => onConfirmarPago(selectedProduct.folio, metodoPago)}
        >
          Confirmar Pago e Imprimir
        </button>
      </div>
    </div>
  );
};