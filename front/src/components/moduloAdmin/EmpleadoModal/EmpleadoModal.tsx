import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './EmpleadoModal.module.css';
import type { Empleado } from '../../../interfaces/ModuloAdmin/Empleado';
import { useNotification } from '../../../context/notifications/NotificationContext';
import { createUser, editUser, getUserById } from '../../../controllers/user.controller';

interface EmpleadoModalProps {
  idEmpleado?: number
  onClose: () => void;
  onSuccess: () => void;
}

export const EmpleadoModal: React.FC<EmpleadoModalProps> = ({
  idEmpleado,
  onClose,
  onSuccess
}) => {
  const [name, setName] = useState('');
  const [shift, setShift] = useState('Mañana (7am–3pm)');
  const [role, setRole] = useState('Mesero');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { showNotification } = useNotification();

  useEffect(() => {
    const loadEmpleado = async () => {
      if (idEmpleado) {
        try {
          const empleado = await getUserById(idEmpleado);

          setName(empleado.nombre_completo);
          setShift("Matutino");
          setRole(empleado.rol);
          setUser(empleado.username);

          // Por seguridad las contraseñas no se precargan
          setPassword("");
          setConfirmPassword("");
        } catch (error) {
          showNotification({
            type: "error",
            title: "Error al obtener el empleado",
            description: `ERROR: ${error}`,
          });
        }
      } else {
        setName("");
        setShift("Matutino");
        setRole("Mesero");
        setUser("");
        setPassword("");
        setConfirmPassword("");
      }

      setPasswordError("");
    };

    loadEmpleado();
  }, [idEmpleado]);

  const registrarUsuario = async (newUser: any) => {
    try {
      await createUser(newUser)

      showNotification({
        type: "success",
        title: "Usuario Creado!",
        description: `Se han ingresado los datos del personal.`
      });

      onSuccess();

    } catch (error) {
      showNotification({
        type: "error",
        title: "Error al crear usuario",
        description: `ERROR: ${error}`
      });
    }
  };

  const editarUsuario = async (user: any) => {
    try {
      if(idEmpleado){
        await editUser(idEmpleado ,user)
      }

      showNotification({
        type: "success",
        title: "Usuario Actualizado!",
        description: `Se han actualizado los datos del personal.`
      });

      onSuccess();

    } catch (error) {
      showNotification({
        type: "error",
        title: "Error al editar usuario",
        description: `ERROR: ${error}`
      });
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;

    // Registro
    if (!idEmpleado) {
      if (password !== confirmPassword) {
        setPasswordError("Las contraseñas no coinciden.");
        return;
      }

      if (!passwordRegex.test(password)) {
        setPasswordError(
          "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
        );
        return;
      }
    }
    // Edición
    else if (password.trim() !== "" || confirmPassword.trim() !== "") {
      if (password !== confirmPassword) {
        setPasswordError("Las contraseñas no coinciden.");
        return;
      }

      if (!passwordRegex.test(password)) {
        setPasswordError(
          "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
        );
        return;
      }
    }

    setPasswordError("");

    if (idEmpleado) {

      var editEmpleado = {};

      if (password.trim() != "") {
        editEmpleado = {
          nombre_completo: name,
          username: user,
          password: password,
          rol: role,
          turno: shift,
          activo: true
        }
      } else {
        editEmpleado = {
          nombre_completo: name,
          username: user,
          rol: role,
          turno: shift,
          activo: true
        }
      }

      editarUsuario(editEmpleado);

    } else {
      console.log('Se registro');

      const newEmpleado = {
        nombre_completo: name,
        username: user,
        password: password,
        rol: role,
        turno: shift,
        activo: true
      }

      registrarUsuario(newEmpleado);


    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <div>
            <span className={styles.subtitle}>
              {idEmpleado ? 'EDITAR EMPLEADO' : 'NUEVO EMPLEADO'}
            </span>
            <h2 className={styles.title}>
              {idEmpleado ? 'Editar Personal' : 'Agregar Personal'}
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
              <option value="Matutino">Mañana</option>
              <option value="Vespertino">Tarde</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Usuario</label>
            <input
              type="text"
              value={user}
              placeholder='Usuario'
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
              required={!idEmpleado}
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
              required={!idEmpleado}
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
              {idEmpleado ? 'Guardar Cambios' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};