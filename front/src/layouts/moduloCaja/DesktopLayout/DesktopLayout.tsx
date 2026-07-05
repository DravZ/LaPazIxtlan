import React, { useState } from "react";
import { CreditCard } from "lucide-react";
import { MainContent } from "../../../components/moduloCaja/MainContent/MainContent";
import styles from './DesktopLayout.module.css';
import { SecondaryPanel } from "../../../components/moduloCaja/SecondaryPanel/SecondaryPanel";
import type { Orden } from "../../../interfaces/moduloCaja/Orden"; // Asegúrate de importar el tipo

interface DesktopLayoutProps {
  isDesktop?: boolean
}
const DesktopLayout = ({isDesktop
 }: DesktopLayoutProps) => {
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

        <div className={styles.chip + " w-auto me-4"}>
          <CreditCard size={16} className="me-1" /> Caja Registradora
        </div>
      </div>

      <div className="row h-100 m-0 p-0">
        <div className="col-8 p-0 h-100">
          {/* Le pasamos el estado y la función para cambiarlo */}
          <MainContent
            isDesktop={isDesktop}
            selectedProduct={selectedProduct}
            onSelectProduct={setSelectedProduct}
          />
        </div>
        <div style={{ height: 'calc(100vh - 84.8px)' }} className="col-4 border-end p-0">

          <SecondaryPanel
            selectedProduct={selectedProduct}
            onConfirmarPago={handleConfirmarPago}
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopLayout;

