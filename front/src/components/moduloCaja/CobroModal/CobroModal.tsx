import React, { useState } from 'react';
import { CreditCard, DollarSign, X } from 'lucide-react';
import styles from './CobroModal.module.css'; // Reutiliza o renombra tu CSS
import type { Orden } from '../../../interfaces/moduloCaja/Orden';

interface CobroModalProps {
    selectedProduct: Orden | null;
    onConfirmarPago: (folio: string, metodo: 'efectivo' | 'tarjeta') => void;
    onClose: () => void;
}

export const CobroModal: React.FC<CobroModalProps> = ({
    selectedProduct,
    onConfirmarPago,
    onClose
}) => {
    const [metodoPago, setMetodoPago] = useState<'efectivo' | 'tarjeta'>('tarjeta');

    // Si no hay producto, no renderiza nada (el modal se oculta)
    if (!selectedProduct) return null;

    return (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '500px', height: '85vh' }}>
                <div className={`${styles.containerA} modal-content`}>

                    {/****************************** BLOQUE 1: Cabecera con Botón Cerrar */}
                    <div className={`${styles.bloqueHeader} d-flex justify-content-between align-items-start pt-3 px-4`}>
                        <div>
                            <p className={`${styles.subtitle} mb-0 p-0`}>GESTIÓN DE VENTAS - RF-030</p>
                            <p className={`${styles.title} mt-0 p-0`}>Ticket - {selectedProduct['num-mesa']}</p>
                        </div>
                        <button type="button" className="btn p-1" onClick={onClose}>
                            <X size={24} color="#2C1A0E" />
                        </button>
                    </div>
                    <hr className="mx-4 my-2" />

                    {/****************************** BLOQUE 2: Cuerpo con Scroll Autónomo */}
                    <div className={`${styles.dataTicketContainer} px-4 py-2`}>
                        {/* Cabecera del ticket / desglose */}
                        <div className={styles.header}>
                            <div className={styles.metaLeft}>
                                <span className={styles.folioText}>
                                    {selectedProduct['num-mesa']} - {selectedProduct.hora}
                                </span>
                                <p className={`${styles.folioText} m-0`}>
                                    <b>Mesero:</b> {selectedProduct.mesero}
                                    <b className="ms-3">Folio: </b> #{selectedProduct.folio}
                                </p>
                            </div>
                        </div>

                        <hr className={styles.divider} />

                        {/* Lista Desglosada de Productos */}
                        <div className={styles.productosList}>
                            {selectedProduct.productos.map((prod, idx) => {
                                const tieneToppings = prod.toppings && prod.toppings.length > 0;
                                const toppingsString = tieneToppings
                                    ? `Toppings: ${prod.toppings!.map(t => `${t.nombre} (${t.cantidad})`).join(', ')}`
                                    : '';

                                return (
                                    <div key={idx} className={`${styles.productDiv} row d-flex p-2 m-0 align-items-center`}>
                                        <div className={`${styles.productoItem} col-9 m-0`}>
                                            <div className={styles.prodMainRow}>
                                                <span className={styles.prodNombre}>
                                                    <strong className={styles.prodCantidad}>{prod.cantidad}×</strong> {prod.nombre}
                                                </span>
                                            </div>
                                            {tieneToppings && <p className={styles.toppingsLegend}>{toppingsString}</p>}
                                        </div>
                                        <div className={`${styles.productPrice} col-3 text-end m-0`}>
                                            {/* Aquí puedes mapear el precio real del producto si tu interfaz lo permite */}
                                            $170
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <hr className={styles.divider} />

                        {/* Selector de Método de Pago */}
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
                            <hr className="my-1 opacity-25" />
                            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                                <span>Total:</span>
                                <span className={styles.total}>${selectedProduct.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/****************************** BLOQUE 3: Footer fijo en la base */}
                    <div className={`${styles.bloqueFooter} p-4`}>
                        <button
                            className={styles.btnConfirmar}
                            onClick={() => {onConfirmarPago(selectedProduct.folio, metodoPago)
                                onClose()
                            }}
                        >
                            Confirmar Pago e Imprimir
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};