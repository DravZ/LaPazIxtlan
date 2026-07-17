import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import styles from './PersonalSection.module.css';
import type { Empleado } from '../../../../interfaces/ModuloAdmin/Empleado';
import { PersonalCard } from '../../../../components/moduloAdmin/PersonalCard/PersonalCard';
import { EmpleadoModal } from '../../../../components/moduloAdmin/EmpleadoModal/EmpleadoModal';
import { DeletePersonalModal } from '../../../../components/moduloAdmin/DeletePersonalModal/DeletePersonalModal';

const MOCK_PERSONAL: Empleado[] = [
  { id: 'EMP-001', name: 'Carlos Mendoza', role: 'Mesero', shift: 'Tarde (3pm–11pm)' },
  { id: 'EMP-002', name: 'Ana Pérez', role: 'Mesero', shift: 'Mañana (7am–3pm)' },
  { id: 'EMP-003', name: 'Luis García', role: 'Mesero', shift: 'Tarde (3pm–11pm)' },
  { id: 'EMP-004', name: 'María López', role: 'Hostess', shift: 'Mañana (7am–3pm)' },
  { id: 'EMP-005', name: 'Sofía Ramírez', role: 'Mesero', shift: 'Noche (11pm–7am)' }
];

const PersonalSection = () => {
  const [personal, setPersonal] = useState<Empleado[]>(MOCK_PERSONAL);
  
  // Estados de control para Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState<Empleado | undefined>(undefined);

  const handleOpenAdd = () => {
    setSelectedEmpleado(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (empleado: Empleado) => {
    setSelectedEmpleado(empleado);
    setIsModalOpen(true);
  };

  const handleOpenDelete = (empleado: Empleado) => {
    setSelectedEmpleado(empleado);
    setIsDeleteOpen(true);
  };

  const handleSave = (data: Empleado) => {
    if (selectedEmpleado) {
      // Backend: update API
      setPersonal(prev => prev.map(e => e.id === selectedEmpleado.id ? { ...data } : e));
    } else {
      // Backend: create API
      setPersonal(prev => [...prev, data]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (selectedEmpleado) {
      // Backend: delete API
      setPersonal(prev => prev.filter(e => e.id !== selectedEmpleado.id));
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
            {personal.map(empleado => (
              <PersonalCard 
                key={empleado.id} 
                empleado={empleado}
                onEdit={() => handleOpenEdit(empleado)}
                onDelete={() => handleOpenDelete(empleado)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modales Atómicos */}
      {isModalOpen && (
        <EmpleadoModal 
          empleado={selectedEmpleado} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSave}
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