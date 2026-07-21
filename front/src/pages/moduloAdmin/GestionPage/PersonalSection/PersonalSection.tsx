import { useEffect, useState } from 'react';
import { UserPlus } from 'lucide-react';
import styles from './PersonalSection.module.css';
import type { Empleado } from '../../../../interfaces/ModuloAdmin/Empleado';
import { PersonalCard } from '../../../../components/moduloAdmin/PersonalCard/PersonalCard';
import { EmpleadoModal } from '../../../../components/moduloAdmin/EmpleadoModal/EmpleadoModal';
import { DeletePersonalModal } from '../../../../components/moduloAdmin/DeletePersonalModal/DeletePersonalModal';
import { deleteUser, getAllUsersActive } from '../../../../controllers/user.controller';
import { useNotification } from '../../../../context/notifications/NotificationContext';


const MOCK_PERSONAL: Empleado[] = [
  { id: 'EMP-001', name: 'Carlos Mendoza', role: 'Mesero', shift: 'Tarde (3pm–11pm)' },
  { id: 'EMP-002', name: 'Ana Pérez', role: 'Mesero', shift: 'Mañana (7am–3pm)' },
  { id: 'EMP-003', name: 'Luis García', role: 'Mesero', shift: 'Tarde (3pm–11pm)' },
  { id: 'EMP-004', name: 'María López', role: 'Hostess', shift: 'Mañana (7am–3pm)' },
  { id: 'EMP-005', name: 'Sofía Ramírez', role: 'Mesero', shift: 'Noche (11pm–7am)' }
];

const PersonalSection = () => {
  const [personal, setPersonal] = useState([]);

  // Estados de control para Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState<number | undefined>(undefined);

  const { showNotification } = useNotification();

  const cargarUsuarios = async () => {
    try {
      const usuarios = await getAllUsersActive();

      console.log(usuarios)
      setPersonal(usuarios)

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    cargarUsuarios();
  }, []);

  const handleOpenAdd = () => {
    setSelectedEmpleado(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (id: number) => {
    setSelectedEmpleado(id);
    setIsModalOpen(true);
  };

  const handleOpenDelete = (id: number) => {
    setSelectedEmpleado(id);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedEmpleado) {
      try {
        await deleteUser(selectedEmpleado);

        showNotification({
          type: "success",
          title: "Usuario Eliminado!",
          description: `Se han eliminado los datos del personal.`
        });

        cargarUsuarios();

      } catch (error) {
        showNotification({
          type: "error",
          title: "Error al eliminar usuario",
          description: `ERROR: ${error}`
        });
      }


    }
    setIsDeleteOpen(false);
  };

  return (
    <div className="row d-block m-0 p-0">
      <div className='row m-0 p-0 mt-3'>
        <div className={styles.personalContainer}>
          <button className={styles.btnAddPersonal} onClick={handleOpenAdd}>
            <UserPlus size={18} className="me-2" /> Agregar Personal
          </button>

          <div className={styles.cardsGrid}>
            {personal.map((empleado: any) => (
              <PersonalCard
                key={empleado.id_usuario}
                empleado={empleado}
                onEdit={() => handleOpenEdit(empleado.id_usuario)}
                onDelete={() => handleOpenDelete(empleado.id_usuario)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modales Atómicos */}
      {isModalOpen && (
        <EmpleadoModal
          idEmpleado={selectedEmpleado}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            cargarUsuarios();
          }}
        />
      )}

      {isDeleteOpen && (
        <DeletePersonalModal
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default PersonalSection;