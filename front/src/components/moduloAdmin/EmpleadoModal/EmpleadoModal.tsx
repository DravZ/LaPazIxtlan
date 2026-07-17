import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './EmpleadoModal.module.css';
import type { Empleado } from '../../../interfaces/ModuloAdmin/Empleado';

interface EmpleadoModalProps {
  empleado?: Empleado;
  onClose: () => void;
  onSave: (data: Empleado) => void;
}

export const EmpleadoModal: React.FC<EmpleadoModalProps> = ({
  empleado,
  onClose,
  onSave
}) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [shift, setShift] = useState('Mañana (7am–3pm)');
  const [role, setRole] = useState('Mesero');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (empleado) {
      setName(empleado.name);
      setId(empleado.id);
      setShift(empleado.shift);
      setRole(empleado.role);

      // Si después recibes usuario desde el backend puedes cargarlo aquí
      setUser('');

      // Por seguridad las contraseñas no se precargan
      setPassword('');
      setConfirmPassword('');
    } else {
      setName('');
      setId('');
      setShift('Mañana (7am–3pm)');
      setRole('Mesero');
      setUser('');
      setPassword('');
      setConfirmPassword('');
    }

    setPasswordError('');
  }, [empleado]);

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    setPasswordError('Las contraseñas no coinciden.');
    return;
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;

  if (!passwordRegex.test(password)) {
    setPasswordError(
      'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.'
    );
    return;
  }

  setPasswordError('');

  if (empleado) {
    console.log('Se edito');
  } else {
    console.log('Se registro');
  }

  onSave({
    id: id.trim(),
    name: name.trim(),
    role,
    shift
  });
};

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <div>
            <span className={styles.subtitle}>
              {empleado ? 'EDITAR EMPLEADO' : 'NUEVO EMPLEADO'}
            </span>
            <h2 className={styles.title}>
              {empleado ? 'Editar Personal' : 'Agregar Personal'}
            </h2>
          </div>

          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Nombre Completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Carlos Mendoza"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Rol</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Mesero">Mesero</option>
              <option value="Cocinero">Cocinero</option>
              <option value="Cajero">Cajero</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Turno</label>
            <select
              value={shift}
              onChange={(e) => setShift(e.target.value)}
            >
              <option value="Mañana (7am–3pm)">Mañana (7am–3pm)</option>
              <option value="Tarde (3pm–11pm)">Tarde (3pm–11pm)</option>
              <option value="Noche (11pm–7am)">Noche (11pm–7am)</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Usuario</label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);

                if (passwordError) {
                  setPasswordError('');
                }
              }}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Confirmar Contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);

                if (passwordError) {
                  setPasswordError('');
                }
              }}
              required
            />
          </div>

          {passwordError && (
            <div className={styles.errorToast}>
              {passwordError}
            </div>
          )}

          <div className={styles.footerActions}>
            <button
              type="button"
              className={styles.btnCancel}
              onClick={onClose}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className={styles.btnRegister}
            >
              {empleado ? 'Guardar Cambios' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};