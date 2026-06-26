// Card.tsx
import type { LucideIcon } from "lucide-react";
import styles from './CorteCard.module.css'

interface CardProps {
    title: string;
    estadistica: string;
    Icon: LucideIcon;
}

export default function CorteCard({ title, 
    estadistica, Icon }: CardProps) {
    return (
        <div className={ styles.cardContainer +  " row mx-2 my-2 px-3 py-3"}>
            <div className={styles.icoContainer}>
                <Icon size={24} />
            </div>
            <p className={ styles.title +  " mt-2 mb-0 mx-0 px-0"}>{title}</p>
            <p className={ styles.estadistica +  " mt-0 mb-2 mx-0 px-0"}>{estadistica}</p>
        </div>
    );
}