// Card.tsx
import type { LucideIcon } from "lucide-react";
import styles from './EstadisticasCard.module.css'

interface CardProps {
    title: string;
    estadistica: string;
    desc: string;
    Icon: LucideIcon;
    colorIco: string;
    bgColorIco: string;
}

export default function EstadisticasCard({ title, 
    estadistica, desc, Icon, colorIco, bgColorIco }: CardProps) {
    return (
        <div className={ styles.cardContainer +  " row mx-2 my-2 px-3 py-3"}>
            <div className={styles.icoContainer}  style={{
                color: colorIco,
                backgroundColor: bgColorIco
            }}>
                <Icon size={24} />
            </div>
            <p className={ styles.title +  " mt-2 mb-0 mx-0 px-0"}>{title}</p>
            <p className={ styles.estadistica +  " mt-0 mb-2 mx-0 px-0"}>{estadistica}</p>
            <p className={ styles.descripcion +  " my-0 mx-0 px-0"}>{desc}</p>
        </div>
    );
}