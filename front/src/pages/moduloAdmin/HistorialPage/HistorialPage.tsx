import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import styles from './HistorialPage.module.css';
import type { Order } from '../../../interfaces/ModuloAdmin/orderHistory';
import { OrderCard } from '../../../components/moduloAdmin/OrderCard/OrderCard';

const MOCK_ORDERS: Order[] = [
  {
    id: 's1',
    tableNumber: '3',
    timestamp: '10:16 a.m.',
    products: [{ id: '1', name: 'Tacos al Pastor', quantity: 2 }, { id: '2', name: 'Agua de Jamaica', quantity: 2 }],
    observations: 'Sin cebolla en los tacos',
    status: 'descartada'
  },
  {
    id: 's2',
    tableNumber: '7',
    timestamp: '10:10 a.m.',
    products: [{ id: '3', name: 'Hamburguesa Ixtlan', quantity: 1 }, { id: '4', name: 'Limonada Natural', quantity: 2 }],
    observations: 'Término medio',
    status: 'pendiente'
  },
  {
    id: 's3',
    tableNumber: '2',
    timestamp: '10:01 a.m.',
    products: [{ id: '5', name: 'Enchiladas Rojas', quantity: 3 }, { id: '6', name: 'Café de Olla', quantity: 3 }],
    observations: 'Extra picante',
    status: 'en-cocina'
  },
  {
    id: 's4',
    tableNumber: '5',
    timestamp: '09:47 a.m.',
    products: [{ id: '7', name: 'Guacamole de la Casa', quantity: 2 }, { id: '8', name: 'Quesadilla Especial', quantity: 1 }],
    observations: '',
    status: 'lista'
  }
];

export const HistorialPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = useMemo(() => {
    return MOCK_ORDERS.filter((order) => 
      order.tableNumber.includes(searchTerm) || 
      order.products.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <Search className={styles.searchIcon} size={20} />
        <input 
          type="text" 
          placeholder="Buscar por mesa o producto..." 
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm('')} className={styles.clearButton}>
            <X size={18} />
          </button>
        )}
      </div>

      <div className={styles.ordersList}>
        {filteredOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};