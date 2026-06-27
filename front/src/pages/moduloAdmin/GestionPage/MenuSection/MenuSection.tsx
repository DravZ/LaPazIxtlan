import { useState } from 'react';
import { Plus, PlusCircle } from 'lucide-react';
import styles from './MenuSection.module.css';
import type { Platillo } from '../../../../interfaces/ModuloAdmin/Platillo';
import { PlatilloGestionCard } from '../../../../components/moduloAdmin/PlatilloGestionCard/PlatilloGestionCard';
import { PlatilloModal } from '../../../../components/moduloAdmin/PlatilloModal/PlatilloModal';
import { DeleteModal } from '../../../../components/moduloAdmin/DeletePlatilloModal/DeleteModal';

const MOCK_PLATILLOS: Platillo[] = [
  { id: '1', name: 'Guacamole de la Casa', category: 'Entradas', price: 85, description: 'Aguacate fresco, cilantro, cebolla morada y limón de temporada.', image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=150', isAvailable: false },
  { id: '2', name: 'Nachos Artesanales', category: 'Entradas', price: 95, description: 'Totopos de maíz nixtamalizado con queso fundido y frijoles.', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=150', isAvailable: true },
  { id: '3', name: 'Sopa de Lima', category: 'Entradas', price: 90, description: 'Caldo tradicional con pollo deshebrado y rodajas de lima.', image: 'https://images.unsplash.com/photo-1547592165-e1d17fed6005?w=150', isAvailable: true },
  { id: '4', name: 'Hamburguesa La Paz', category: 'Hamburguesas', price: 175, description: 'Carne artesanal a la leña, queso oaxaca y aderezo chipotle.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150', isAvailable: true }
];

const MenuSection = () => {
  const [platillos, setPlatillos] = useState<Platillo[]>(MOCK_PLATILLOS);
  
  // Estados para control de Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPlatillo, setSelectedPlatillo] = useState<Platillo | undefined>(undefined);

  const handleToggleAvailable = (id: string) => {
    setPlatillos(prev => prev.map(p => p.id === id ? { ...p, isAvailable: !p.isAvailable } : p));
  };

  const handleOpenAdd = () => {
    setSelectedPlatillo(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (platillo: Platillo) => {
    setSelectedPlatillo(platillo);
    setIsModalOpen(true);
  };

  const handleOpenDelete = (platillo: Platillo) => {
    setSelectedPlatillo(platillo);
    setIsDeleteOpen(true);
  };

  const handleSave = (data: Partial<Platillo>) => {
    if (selectedPlatillo) {
      // Backend Integration: update API
      setPlatillos(prev => prev.map(p => p.id === selectedPlatillo.id ? { ...p, ...data } : p));
    } else {
      // Backend Integration: create API
      const newPlatillo: Platillo = {
        id: Math.random().toString(),
        name: data.name || '',
        category: data.category || 'Entradas',
        price: data.price || 0,
        description: data.description || '',
        image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=150',
        isAvailable: true
      };
      setPlatillos(prev => [newPlatillo, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (selectedPlatillo) {
      // Backend Integration: delete API
      setPlatillos(prev => prev.filter(p => p.id !== selectedPlatillo.id));
    }
    setIsDeleteOpen(false);
  };

  return (
    <div className="row d-block m-0 p-0">

      <div className='row m-0 p-0 mt-3'>
        <div className={styles.menuContainer}>
            <button className={styles.btnAddPlatillo} onClick={handleOpenAdd}>
              <PlusCircle size={18} className="me-2" /> Agregar Platillo
            </button>

            <div className={styles.cardsGrid}>
              {platillos.map(platillo => (
                <PlatilloGestionCard 
                  key={platillo.id} 
                  platillo={platillo} 
                  onToggle={() => handleToggleAvailable(platillo.id)}
                  onEdit={() => handleOpenEdit(platillo)}
                  onDelete={() => handleOpenDelete(platillo)}
                />
              ))}
            </div>
          </div>
      </div>

      {/* Modales Reactivos */}
      {isModalOpen && (
        <PlatilloModal 
          platillo={selectedPlatillo} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSave}
        />
      )}

      {isDeleteOpen && (
        <DeleteModal 
          onClose={() => setIsDeleteOpen(false)} 
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default MenuSection;