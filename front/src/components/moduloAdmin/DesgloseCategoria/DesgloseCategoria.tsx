import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import styles from './DesgloseCategoria.module.css';

// 1. Estructura exacta del objeto JSON solicitado
interface CategoriaPorcentaje {
  producto: string;
  porcentaje: number;
}

interface DesgloseCategoriaProps {
  timeRange: 'hoy' | 'semana' | 'mes' | 'ano';
  turno: 'completo' | 'matutino' | 'vespertino';
}

const COLORS = ['#2E5936', '#5C926F', '#C08A3E', '#A04424'];

// Estructura de estado plano (Array directo listo para el endpoint)
const MOCK_API_RESPONSE: CategoriaPorcentaje[] = [
  { producto: 'Platos Fuertes', porcentaje: 42 },
  { producto: 'Bebidas', porcentaje: 24 },
  { producto: 'Entradas', porcentaje: 21 },
  { producto: 'Postres', porcentaje: 13 }
];

export const DesgloseCategoria: React.FC<DesgloseCategoriaProps> = ({ timeRange, turno }) => {
  const [data, setData] = useState<CategoriaPorcentaje[]>(MOCK_API_RESPONSE);

  // 2. Efecto preparado: reacciona a los props y queda listo para setear el JSON del endpoint
  useEffect(() => {
    // Aquí harás tu llamada: 
    // const res = await fetch(`/api/desglose?range=${timeRange}&turno=${turno}`);
    // const json: CategoriaPorcentaje[] = await res.json();
    // setData(json);
    
    console.log(`Props cambiaron -> Solicitando datos para Rango: ${timeRange} y Turno: ${turno}`);
  }, [timeRange, turno]);

  return (
    <div className={styles.containerCard}>
      <div className={styles.header}>
        <h3 className={styles.title}>Desglose por Categoría</h3>
        <p className={styles.subtitle}>Participación porcentual de ventas por tipo de producto</p>
      </div>

      <div className={styles.contentLayout}>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="porcentaje"
                nameKey="producto"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                startAngle={90}
                endAngle={-270}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.legendContainer}>
          {data.map((item, index) => {
            const color = COLORS[index % COLORS.length];
            return (
              <div key={item.producto} className={styles.legendRow}>
                <div className={styles.legendLeft}>
                  <span className={styles.colorDot} style={{ backgroundColor: color }} />
                  <span className={styles.categoryName}>{item.producto}</span>
                </div>
                <span className={styles.percentageValue} style={{ color: color }}>
                  {item.porcentaje}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};