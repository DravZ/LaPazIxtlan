import React from 'react';
import { Users } from 'lucide-react';
import styles from './DeletePersonal.module.css';

interface DeletePersonalModalProps {
    onClose: () => void;
    onConfirm: () => void;
}

export const DeletePersonalModal: React.FC<DeletePersonalModalProps> = ({ onClose, onConfirm }) => {
    return (
        <div className={styles.overlay}>
            <div className={`${styles.modalContent} ${styles.deleteModal}`}>
                <div className={styles.deleteIconWrapper}>
                    <Users size={24} />
                </div>
                <h2 className={styles.deleteTitle}>¿Dar de baja a este empleado?</h2>
                <p className={styles.deleteDescription}>El empleado será eliminado del directorio.</p>

                <div className={styles.footerActions}>
                    <button className={styles.btnCancel} onClick={onClose}>Cancelar</button>
                    <button className={styles.btnConfirm} onClick={onConfirm}>Confirmar</button>
                </div>
            </div>
        </div>
    );
};