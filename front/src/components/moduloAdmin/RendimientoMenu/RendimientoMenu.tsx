import React, { useState, useEffect } from 'react';
import styles from './RendimientoMenu.module.css';

// 1. Contratos de Datos según tu requerimiento
interface PlatilloRendimiento {
  producto: string;
  rendimientoUSD: number; // Cantidad de unidades vendidas o ingresos
}

interface RendimientoMenuProps {
  timeRange: 'hoy' | 'semana' | 'mes' | 'ano';
  turno: 'completo' | 'matutino' | 'vespertino';
}

// 2. Mock estructurado en JSON para simular las respuestas del Endpoint
const MOCK_RENDIMIENTO_DATA: Record<string, { masVendidos: PlatilloRendimiento[]; menosVendidos: PlatilloRendimiento[] }> = {
  'mes-completo': {
    masVendidos: [
      { producto: 'Tacos al Pastor', rendimientoUSD: 127 },
      { producto: 'Hamburguesa Ixtlan', rendimientoUSD: 98 },
      { producto: 'Hamburguesa La Paz', rendimientoUSD: 87 },
      { producto: 'Guacamole de la Casa', rendimientoUSD: 76 },
      { producto: 'Nachos Artesanales', rendimientoUSD: 71 },
      { producto: 'Enchiladas Rojas', rendimientoUSD: 64 },
      { producto: 'Quesadilla Especial', rendimientoUSD: 58 },
      { producto: 'Agua de Jamaica', rendimientoUSD: 52 },
      { producto: 'Limonada Natural', rendimientoUSD: 45 },
      { producto: 'Sopa de Lima', rendimientoUSD: 38 },
    ],
    menosVendidos: [
      { producto: 'Café de Olla', rendimientoUSD: 8 },
      { producto: 'Sopa de Lima', rendimientoUSD: 15 },
      { producto: 'Limonada Natural', rendimientoUSD: 18 },
      { producto: 'Agua de Jamaica', rendimientoUSD: 22 },
      { producto: 'Quesadilla Especial', rendimientoUSD: 28 },
      { producto: 'Enchiladas Rojas', rendimientoUSD: 34 },
      { producto: 'Nachos Artesanales', rendimientoUSD: 38 },
      { producto: 'Guacamole de la Casa', rendimientoUSD: 41 },
      { producto: 'Hamburguesa La Paz', rendimientoUSD: 53 },
      { producto: 'Tacos al Pastor', rendimientoUSD: 67 },
    ]
  },
  // Puedes mapear otras combinaciones para pruebas locales:
  'hoy-completo': {
    masVendidos: [
      { producto: 'Tacos al Pastor', rendimientoUSD: 25 },
      { producto: 'Guacamole de la Casa', rendimientoUSD: 14 },
    ],
    menosVendidos: [
      { producto: 'Café de Olla', rendimientoUSD: 1 },
      { producto: 'Sopa de Lima', rendimientoUSD: 3 },
    ]
  }
};

export const RendimientoMenu: React.FC<RendimientoMenuProps> = ({ timeRange, turno }) => {
  const [activeTab, setActiveTab] = useState<'mas' | 'menos'>('mas');
  const [currentLists, setCurrentLists] = useState({ masVendidos: [] as PlatilloRendimiento[], menosVendidos: [] as PlatilloRendimiento[] });

  // 3. Efecto reactivo para actualizar listas al cambiar filtros globales
  useEffect(() => {
    const filterKey = `${timeRange}-${turno}`;
    const targetData = MOCK_RENDIMIENTO_DATA[filterKey] || MOCK_RENDIMIENTO_DATA['mes-completo'];
    setCurrentLists(targetData);
    
    console.log(`Actualizando Rendimiento del Menú usando Filtros -> Rango: ${timeRange}, Turno: ${turno}`);
  }, [timeRange, turno]);

  // Selección de la lista de trabajo según el botón conmutador
  const activeList = activeTab === 'mas' ? currentLists.masVendidos : currentLists.menosVendidos;

  // Encontrar el valor más alto de la lista actual para que sea el 100% de la barra
  const maxVal = activeList.length > 0 ? Math.max(...activeList.map(item => item.rendimientoUSD)) : 1;

  return (
    <div className={styles.containerCard}>
      {/* Encabezado con título del módulo y botones segmentados de filtro interno */}
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>Rendimiento del Menú</h3>
          <p className={styles.subtitle}>Volumen de ventas por platillo</p>
        </div>

        <div className={styles.pillControl}>
          <button 
            className={`${styles.pillBtn} ${activeTab === 'mas' ? styles.activeMas : ''}`}
            onClick={() => setActiveTab('mas')}
          >
            Más Vendidos
          </button>
          <button 
            className={`${styles.pillBtn} ${activeTab === 'menos' ? styles.activeMenos : ''}`}
            onClick={() => setActiveTab('menos')}
          >
            Menos Vendidos
          </button>
        </div>
      </div>

      {/* Lista Dinámica de Barras de Rendimiento */}
      <div className={styles.listWrapper}>
        {activeList.map((item, index) => {
          // Cálculo proporcional en tiempo real de la barra de progreso
          const widthPercentage = (item.rendimientoUSD / maxVal) * 100;

          return (
            <div key={item.producto} className={styles.rowItem}>
              <div className={styles.indexLabel}>{index + 1}</div>
              
              <div className={styles.barContainer}>
                <div className={styles.topInfo}>
                  <span className={styles.productName}>{item.producto}</span>
                  <span className={styles.udsLabel}>{item.rendimientoUSD} uds</span>
                </div>
                
                {/* Track de fondo */}
                <div className={styles.progressTrack}>
                  {/* Llenado dinámico aplicando la clase correspondiente */}
                  <div 
                    className={`${styles.progressBar} ${activeTab === 'mas' ? styles.barMas : styles.barMenos}`}
                    style={{ width: `${widthPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};