import React, { useState } from "react";
import { Check, CheckCircle2, DollarSign, Receipt, Users } from "lucide-react";
import CorteCard from "../../../components/moduloAdmin/CorteCard/CorteCard";
import styles from './CortePage.module.css';

export const CortePage: React.FC = () => {
    const [isGenerated, setIsGenerated] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [folio, setFolio] = useState<string>("#636683"); // Preparado para backend

    const handleGenerarCorte = () => {
        // Aquí conectarías con tu servicio/hook de backend: const res = await api.generarCorte();
        setIsAnimating(true);
        setIsGenerated(true);
    };

    const handleNuevoCorte = () => {
        setIsAnimating(false);
        // Esperamos a que la animación de salida termine antes de desmontar el componente (200ms)
        setTimeout(() => {
            setIsGenerated(false);
            setFolio(`#${Math.floor(100000 + Math.random() * 900000)}`); // Simulación de nuevo folio para el próximo click
        }, 200);
    };

    return (
        <div className="row">
            <div className="col-6 m-0 p-0">
                <CorteCard title="Total del día" estadistica="$190" Icon={DollarSign} />
            </div>
            <div className="col-6 m-0 p-0">
                <CorteCard title="Órdenes entregadas" estadistica="1" Icon={CheckCircle2} />
            </div>
            <div className="col-6 m-0 p-0">
                <CorteCard title="Promedio / orden" estadistica="$190" Icon={Receipt} />
            </div>
            <div className="col-6 m-0 p-0">
                <CorteCard title="Mesas atendidas" estadistica="1" Icon={Users} />
            </div>

            <div className={styles.separator}>
                <div className={styles.line}></div>
                <div className={styles.star}>✦</div>
                <div className={styles.line}></div>
            </div>

            {/* Bloque del Botón Principal (Desaparece elegantemente al activarse) */}
            {!isGenerated && (
                <button
                    className={`${styles.btnCorte} ${isAnimating ? styles.fadeOut : ''}`}
                    onClick={handleGenerarCorte}
                >
                    <span className="me-2">
                        <Receipt size={20} />
                    </span>
                    Generar Corte de Caja
                </button>
            )}

            {/* Bloque de Éxito: Despliegue animado controlado */}
            {isGenerated && (
                <div className={`${styles.successContainer} ${isAnimating ? styles.slideIn : styles.slideOut}`}>
                    <div className={styles.iconCircle}>
                        <Check size={32} strokeWidth={2.5} />
                    </div>
                    <h2 className={styles.successTitle}>Corte Generado</h2>
                    <p className={styles.successDescription}>
                        El corte de caja fue registrado exitosamente.
                    </p>
                    <span className={styles.folioText}>Folio {folio}</span>

                    <button className={styles.btnNuevoCorte} onClick={handleNuevoCorte}>
                        Nuevo Corte
                    </button>
                </div>
            )}
        </div>
    );
};

export default CortePage;