import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import styles from './PersonalCard.module.css';
import type { Empleado } from '../../../interfaces/ModuloAdmin/Empleado';

interface PersonalCardProps {
  empleado: any;
  onEdit: () => void;
  onDelete: () => void;
}

export const PersonalCard: React.FC<PersonalCardProps> = ({ empleado, onEdit, onDelete }) => {
  // Generar las iniciales del nombre (Ej: "Carlos Mendoza" -> "CM")
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className={styles.card}>
      <div className={styles.leftSide}>
        <div className={styles.avatarCircle}>
          {getInitials(empleado.nombre_completo)}
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{empleado.nombre_completo}</h3>
          <span className={styles.roleShift}>
            {empleado.rol}
          </span>
          <span className={styles.empId}>{empleado.id}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.btnIcon} onClick={onEdit}>
          <Edit2 size={16} />
        </button>
        <button className={`${styles.btnIcon} ${styles.btnDelete}`} onClick={onDelete}>
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};