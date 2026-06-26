import React from 'react';
import styles from './OrderCard.module.css';
import type { Order } from '../../../interfaces/ModuloAdmin/orderHistory';

interface OrderCardProps {
    order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    const { tableNumber, timestamp, products, observations, status, id } = order;

    // Lógica de mapeo de estados a etiquetas y estilos
    const statusConfig = {
        'pendiente': { label: 'Pendiente', className: styles.statusPendiente },
        'en-cocina': { label: 'En cocina', className: styles.statusEnCocina },
        'lista': { label: 'Lista', className: styles.statusLista },
        'descartada': { label: 'Descartada', className: styles.statusDescartada },
    };

    const currentStatus = statusConfig[status];

    return (
        <div className={styles.card}>
            <div className={styles.leftSection}>
                <div className={styles.tableInfo}>
                    <span className={styles.tableLabel}>M.</span>
                    <span className={styles.tableNumber}>{tableNumber}</span>
                </div>
                <span className={styles.timestamp}>{timestamp}</span>
            </div>

            <div className={styles.centerSection}>
                <p className={styles.productsSummary}>
                    {products.map(p => `${p.quantity}× ${p.name}`).join(' - ')}
                </p>
                <span className={styles.orderId}>{id} {observations && `• ${observations}`}</span>
            </div>

            <div className={styles.rightSection}>
                <div className={`${styles.badge} ${currentStatus.className}`}>
                    {currentStatus.label}
                </div>
            </div>
        </div>
    );
};