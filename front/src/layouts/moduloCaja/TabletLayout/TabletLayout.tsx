// layouts/TabletLayout.tsx
import { useState } from "react";
import { MainContent } from "../../../components/moduloCaja/MainContent/MainContent";
import { SecondaryPanel } from "../../../components/moduloCaja/SecondaryPanel/SecondaryPanel";
import type { Orden } from "../../../interfaces/moduloCaja/Orden";

import styles from './TabletLayout.module.css'
import { CreditCard } from "lucide-react";
import { CobroModal } from "../../../components/moduloCaja/CobroModal/CobroModal";
import LogOutBtn from "../../../components/logOut/LogOutBtn";

interface TabletLayoutProps {
  isDesktop?: boolean
}

const TabletLayout = ({ isDesktop
}: TabletLayoutProps) => {

  // El estado inicia vacío aquí arriba
  const [selectedProduct, setSelectedProduct] = useState<Orden | null>(null);

  const handleConfirmarPago = (folio: string, metodo: 'efectivo' | 'tarjeta') => {
    console.log(`Procesando pago para la orden ${folio} vía ${metodo}`);
    // Aquí irá tu fetch al backend para cerrar la orden
  };


  return (
    <div className="container-fluid vh-100 overflow-hidden m-0 p-0">
      <div className={styles.container + " row m-0 p-0 d-flex align-items-center justify-content-between"}>
        <div className="w-auto mt-3 ms-3 mb-3">
          <p className={styles.subtitle + " mb-0"}>RESTAURANTE</p>
          <p className={styles.title + " mb-0"}>La Paz Ixtlan</p>
        </div>

        <div className=" w-auto me-4 d-flex">
          <div className={styles.chip + " w-auto me-4"}>
            <CreditCard size={16} className="me-1" /> Caja
          </div>
          <LogOutBtn/>
        </div>
      </div>

      <div className="row h-100 m-0 p-0">
        <div className="col-12 p-0 h-100">
          {/* Le pasamos el estado y la función para cambiarlo */}
          <MainContent
            isDesktop={isDesktop}
            selectedProduct={selectedProduct}
            onSelectProduct={setSelectedProduct}
          />
        </div>
      </div>
      <CobroModal 
        selectedProduct={selectedProduct}
        onConfirmarPago={handleConfirmarPago}
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );

  return (
    <div className="col-3 m-0 p-0 h-100">
      <SecondaryPanel
        selectedProduct={selectedProduct}
        onConfirmarPago={handleConfirmarPago}
      />
    </div>
  );
};

export default TabletLayout;
