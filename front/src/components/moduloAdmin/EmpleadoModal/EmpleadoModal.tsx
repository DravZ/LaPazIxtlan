import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './EmpleadoModal.module.css';
import type { Empleado } from '../../../interfaces/ModuloAdmin/Empleado';

interface EmpleadoModalProps {
  empleado?: Empleado;
  onClose: () => void;
  onSave: (data: Empleado) => void;
}

export const EmpleadoModal: React.FC<EmpleadoModalProps> = ({ empleado, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [shift, setShift] = useState('Mañana (7am–3pm)');

  useEffect(() => {
    if (empleado) {
      setName(empleado.name);
      setId(empleado.id);
      setShift(empleado.shift);
    } else {
      setName('');
      setId('');
      setShift('Mañana (7am–3pm)');
    }
  }, [empleado]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: id.trim(),
      name: name.trim(),
      role: 'Mesero', // Por defecto según requerimiento visual de los botones
      shift
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <div>
            <span className={styles.subtitle}>{empleado ? 'EDITAR EMPLEADO' : 'NUEVO EMPLEADO'}</span>
            <h2 className={styles.title}>{empleado ? 'Editar Mesero' : 'Agregar Mesero'}</h2>
          </div>
          <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Nombre Completo</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ej. Carlos Mendoza" required />
          </div>

          <div className={styles.inputGroup}>
            <label>ID Empleado</label>
            <input type="text" value={id} onChange={e => setId(e.target.value)} placeholder="Ej. EMP-006" disabled={!!empleado} required />
          </div>

          <div className={styles.inputGroup}>
            <label>Turno</label>
            <select value={shift} onChange={e => setShift(e.target.value)}>
              <option value="Mañana (7am–3pm)">Mañana (7am–3pm)</option>
              <option value="Tarde (3pm–11pm)">Tarde (3pm–11pm)</option>
              <option value="Noche (11pm–7am)">Noche (11pm–7am)</option>
            </select>
          </div>

          <div className={styles.footerActions}>
            <button type="button" className={styles.btnCancel} onClick={onClose}>Cancelar</button>
            <button type="submit" className={styles.btnRegister}>Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};