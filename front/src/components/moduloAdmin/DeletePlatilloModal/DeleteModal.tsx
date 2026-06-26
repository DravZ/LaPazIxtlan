import React from 'react';
import { Trash2 } from 'lucide-react';
import styles from './DeleteModal.module.css';

interface DeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ onClose, onConfirm }) => {
  return (
    <div className={styles.overlay}>
      <div className={`${styles.modalContent} ${styles.deleteModal}`}>
        <div className={styles.deleteIconWrapper}>
          <Trash2 size={24} />
        </div>
        <h2 className={styles.deleteTitle}>¿Eliminar este platillo?</h2>
        <p className={styles.deleteDescription}>Esta acción no se puede deshacer.</p>
        
        <div className={styles.footerActions}>
          <button className={styles.btnCancel} onClick={onClose}>Cancelar</button>
          <button className={styles.btnConfirm} onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};