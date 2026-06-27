import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import styles from './PlatilloGestionCard.module.css';
import type { Platillo } from '../../../interfaces/ModuloAdmin/Platillo';

interface PlatilloGestionCardProps {
  platillo: Platillo;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const PlatilloGestionCard: React.FC<PlatilloGestionCardProps> = ({ platillo, onToggle, onEdit, onDelete }) => {
  return (
    <div className={styles.card}>
      <div className={styles.leftSide}>
        <img src={platillo.image} alt={platillo.name} className={styles.image} />
        <div className={styles.info}>
          <h3 className={styles.name}>{platillo.name}</h3>
          <span className={styles.category}>{platillo.category}</span>
          <span className={styles.price}>${platillo.price}</span>
        </div>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.switchWrapper}>
          <label className={styles.switch}>
            <input type="checkbox" checked={platillo.isAvailable} onChange={onToggle} />
            <span className={styles.slider}></span>
          </label>
          <span className={platillo.isAvailable ? styles.statusAvailable : styles.statusUnavail}>
            {platillo.isAvailable ? 'Disponible' : 'Agotado'}
          </span>
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
    </div>
  );
};