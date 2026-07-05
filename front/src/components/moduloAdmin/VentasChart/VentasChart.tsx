import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './VentasChart.module.css';

// 1. Contratos de Datos (JSON estructural)
interface PointData {
    name: string;  // Eje X (Hora/Día/Mes)
    ventas: number; // Eje Y (Monto numérico)
}

interface VentasChartProps {
    timeRange: 'hoy' | 'semana' | 'mes' | 'ano';
    turno: 'completo' | 'matutino' | 'vespertino';
}

// 2. Objetos JSON de Mock simulando respuestas del Endpoint según los filtros
const MOCK_DATA_VERSIONS: Record<string, PointData[]> = {
    'mes-completo': [
        { name: '08:00', ventas: 300 },
        { name: '10:00', ventas: 550 },
        { name: '12:00', ventas: 1200 },
        { name: '14:00', ventas: 2140 }, // Punto más alto del mockup
        { name: '16:00', ventas: 950 },
        { name: '18:00', ventas: 800 },
        { name: '20:00', ventas: 1900 },
        { name: '22:00', ventas: 600 }
    ],
    'mes-matutino': [
        { name: '08:00', ventas: 400 },
        { name: '10:00', ventas: 850 },
        { name: '12:00', ventas: 1500 },
        { name: '14:00', ventas: 2000 },
        { name: '16:00', ventas: 0 },
        { name: '18:00', ventas: 0 },
        { name: '20:00', ventas: 0 },
        { name: '22:00', ventas: 0 }
    ],
    'hoy-completo': [
        { name: '08:00', ventas: 200 },
        { name: '12:00', ventas: 1400 },
        { name: '16:00', ventas: 700 },
        { name: '20:00', ventas: 2200 }
    ]
};

export const VentasChart: React.FC<VentasChartProps> = ({ timeRange, turno }) => {
    const [data, setData] = useState<PointData[]>(MOCK_DATA_VERSIONS['mes-completo']);

    // 3. Efecto reactivo listo para la integración con tu Backend/API
    useEffect(() => {
        // AQUÍ HARÁS TU LLAMADO FETCH/AXIOS EN EL FUTURO:
        // const fetchChartData = async () => { ... }

        const dataKey = `${timeRange}-${turno}`;
        // Si no encuentra la combinación exacta en el mock, regresa el default
        const currentData = MOCK_DATA_VERSIONS[dataKey] || MOCK_DATA_VERSIONS['mes-completo'];
        setData(currentData);

        console.log(`Buscando datos en API para Rango: ${timeRange} y Turno: ${turno}`);
    }, [timeRange, turno]);

    // Formateador para las etiquetas del Eje Y (Ej: 2140 -> $2.1k o $2,140)
    const formatYAxis = (tickItem: number) => {
        if (tickItem === 0) return '$0';
        return tickItem >= 1000 ? `$${(tickItem / 1000).toFixed(1)}k` : `$${tickItem}`;
    };

    // Formateador personalizado para el Tooltip flotante superior (Estilo Premium del Mockup)
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className={styles.customTooltip}>
                    <span className={styles.tooltipValue}>
                        ${payload[0].value.toLocaleString('es-MX')}
                    </span>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={styles.chartCard}>
            <div className={styles.header}>
                <h3 className={styles.title}>Ventas por Hora</h3>
                <p className={styles.subtitle}>Ingresos acumulados por franja horaria (MXN)</p>
            </div>

            <div className='row m-0 p-0 d-flex justify-content-center'>
                <div className={styles.chartWrapper}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 25, right: 10, left: -15, bottom: 0 }}>
                            <defs>
                                {/* Degradado Verde Orgánico deslavado idéntico al render */}
                                <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2E5936" stopOpacity={0.25} />
                                    <stop offset="95%" stopColor="#2E5936" stopOpacity={0.01} />
                                </linearGradient>
                            </defs>

                            {/* Líneas de guía punteadas horizontales muy discretas */}
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7D6C3" opacity={0.6} />

                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#7C6757', fontSize: 12, fontFamily: 'Nunito Sans' }}
                                dy={10}
                            />

                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={formatYAxis}
                                tick={{ fill: '#7C6757', fontSize: 12, fontFamily: 'Nunito Sans' }}
                            />

                            {/* El indicador tooltip se mantendrá activo y visible siempre sobre el punto correspondiente */}
                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{ stroke: '#2E5936', strokeWidth: 1, strokeDasharray: '4 4' }}
                            />

                            <Area
                                type="monotone" // Curvatura fluida y suave orgánica (Apple/Premium style)
                                dataKey="ventas"
                                stroke="#2E5936"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorVentas)"
                                activeDot={{ r: 6, fill: '#2E5936', stroke: '#FAF5EB', strokeWidth: 2 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};