import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import styles from './PlatilloModal.module.css';
import type { Platillo } from '../../../interfaces/ModuloAdmin/Platillo';

interface PlatilloModalProps {
  platillo?: Platillo;
  onClose: () => void;
  onSave: (data: Partial<Platillo>) => void;
}

export const PlatilloModal: React.FC<PlatilloModalProps> = ({ platillo, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Entradas');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (platillo) {
      setName(platillo.name);
      setPrice(platillo.price.toString());
      setCategory(platillo.category);
      setDescription(platillo.description);
    }
  }, [platillo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, price: Number(price), category, description });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <div>
            <span className={styles.subtitle}>{platillo ? 'EDITAR PLATILLO' : 'NUEVO PLATILLO'}</span>
            <h2 className={styles.title}>{platillo ? 'Editar Platillo' : 'Agregar Platillo'}</h2>
          </div>
          <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Nombre del Platillo</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ej. Tacos al Pastor" required />
          </div>

          <div className={styles.inputGroup}>
            <label>Precio (MXN)</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Ej. 145" required />
          </div>

          <div className={styles.inputGroup}>
            <label>Categoría</label>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="Entradas">Entradas</option>
              <option value="Hamburguesas">Hamburguesas</option>
              <option value="Especiales">Especiales</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Descripción</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Breve descripción del platillo..." rows={3} />
          </div>

          <div className={styles.inputGroup}>
            <label>Foto del Platillo</label>
            <div className={styles.uploadArea}>
              <Plus size={20} />
              <span>Seleccionar foto</span>
            </div>
          </div>

          <div className={styles.footerActions}>
            <button type="button" className={styles.btnCancel} onClick={onClose}>Cancelar</button>
            <button type="submit" className={styles.btnSave}>Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};