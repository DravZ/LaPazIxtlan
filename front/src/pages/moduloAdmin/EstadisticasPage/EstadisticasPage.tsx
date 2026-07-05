import { ChefHat, ChevronDown } from "lucide-react";
import EstadisticasCard from "../../../components/moduloAdmin/EstadisticasCard/EstadisticasCard";
import styles from './EstadisticasPage.module.css'
import { useState } from "react";
import { VentasChart } from "../../../components/moduloAdmin/VentasChart/VentasChart";
import { RendimientoMenu } from "../../../components/moduloAdmin/RendimientoMenu/RendimientoMenu";
import { DesgloseCategoria } from "../../../components/moduloAdmin/DesgloseCategoria/DesgloseCategoria";

type RangoTiempo = 'hoy' | 'semana' | 'mes' | 'ano';
type FiltroTurno = 'completo' | 'matutino' | 'vespertino';

const EstadisticasPage = () => {
    const [timeRange, setTimeRange] = useState<RangoTiempo>('mes');
    const [turno, setTurno] = useState<FiltroTurno>('completo');

    // Traducción visual para el elemento personalizado del select
    const getTimeRangeLabel = (range: RangoTiempo) => {
        switch (range) {
            case 'hoy': return 'Hoy';
            case 'semana': return 'Esta Semana';
            case 'mes': return 'Este Mes';
            case 'ano': return 'Año';
        }
    };
    return (
        <div className="row m-0 p-0">
            <div className="row mx-0 mb-2 p-0">
                <div className={styles.filterContainer}>
                    {/* Selector Dinámico de Rango de Tiempo Personalizado */}
                    <div className={styles.selectWrapper}>
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value as RangoTiempo)}
                            className={styles.timeSelect}
                        >
                            <option value="hoy">Hoy</option>
                            <option value="semana">Esta Semana</option>
                            <option value="mes">Este Mes</option>
                            <option value="ano">Año</option>
                        </select>
                        <div className={styles.selectTrigger}>
                            <span>{getTimeRangeLabel(timeRange)}</span>
                            <ChevronDown size={18} className={styles.icon} />
                        </div>
                    </div>


                    {/* Segmentador Interactivo de Turnos (Pill Selector) */}
                    <div className={styles.segmentControl}>
                        <button
                            className={`${styles.segmentBtn} ${turno === 'completo' ? styles.activeSegment : ''}`}
                            onClick={() => setTurno('completo')}
                        >
                            Turno Completo
                        </button>
                        <button
                            className={`${styles.segmentBtn} ${turno === 'matutino' ? styles.activeSegment : ''}`}
                            onClick={() => setTurno('matutino')}
                        >
                            Matutino
                        </button>
                        <button
                            className={`${styles.segmentBtn} ${turno === 'vespertino' ? styles.activeSegment : ''}`}
                            onClick={() => setTurno('vespertino')}
                        >
                            Vespertino
                        </button>
                    </div>
                </div>
            </div>
            <hr />
            {/*Ventas por hora */}
            <div className=" row mt-4 mx-0 p-0">
                <VentasChart timeRange={timeRange} turno={turno} />
            </div>
            {/*Rendimiento menu*/}
            <div className=" row mt-1 mx-0 p-0">
                <RendimientoMenu timeRange={timeRange} turno={turno} />
            </div>
            {/*Desgloce categorias*/}
            <div className=" row mt-1 mx-0 p-0">
                <DesgloseCategoria timeRange={timeRange} turno={turno} />
            </div>
            <div className="col-6 col-md-4 col-xl-3 m-0 p-0">
                <EstadisticasCard
                    title="Platillo más vendido"
                    estadistica="Tacos al Pastor"
                    desc="127 porciones este mes"
                    Icon={ChefHat}
                    colorIco="#E5B12E"
                    bgColorIco="#f3dca2"
                />
            </div>
            <div className="col-6 col-md-4 col-xl-3 m-0 p-0">
                <EstadisticasCard
                    title="Platillo más vendido"
                    estadistica="Tacos al Pastor"
                    desc="127 porciones este mes"
                    Icon={ChefHat}
                    colorIco="#E5B12E"
                    bgColorIco="#f3dca2"
                />
            </div>
            <div className="col-6 col-md-4 col-xl-3 m-0 p-0">
                <EstadisticasCard
                    title="Platillo más vendido"
                    estadistica="Tacos al Pastor"
                    desc="127 porciones este mes"
                    Icon={ChefHat}
                    colorIco="#E5B12E"
                    bgColorIco="#f3dca2"
                />
            </div>
            <div className="col-6 col-md-4 col-xl-3 m-0 p-0">
                <EstadisticasCard
                    title="Platillo más vendido"
                    estadistica="Tacos al Pastor"
                    desc="127 porciones este mes"
                    Icon={ChefHat}
                    colorIco="#E5B12E"
                    bgColorIco="#f3dca2"
                />
            </div>
            <div className="col-6 col-md-4 col-xl-3 m-0 p-0">
                <EstadisticasCard
                    title="Platillo más vendido"
                    estadistica="Tacos al Pastor"
                    desc="127 porciones este mes"
                    Icon={ChefHat}
                    colorIco="#E5B12E"
                    bgColorIco="#f3dca2"
                />
            </div>
            <div className="col-6 col-md-4 col-xl-3 m-0 p-0">
                <EstadisticasCard
                    title="Platillo más vendido"
                    estadistica="Tacos al Pastor"
                    desc="127 porciones este mes"
                    Icon={ChefHat}
                    colorIco="#E5B12E"
                    bgColorIco="#f3dca2"
                />
            </div>
        </div>
    );
};

export default EstadisticasPage;