// pages/Dashboard.tsx

import { useState } from "react";
import { useScreenSize } from "../../hooks/useScreenSize";
import type { ProductMenu } from "../../interfaces/ModuloMenu/ProductMenu";
import DesktopLayout from "../../layouts/ModuloMenu/DesktopLayout";
import TabletLayout from "../../layouts/ModuloMenu/TabletLayout";
import MobileLayout from "../../layouts/ModuloMenu/MobileLayout/MobileLayout";
import ProductModal from "../../components/moduloMenu/ProductModal/ProductModal";
import ConfirmOrderModal from "../../components/moduloMenu/ConfirmOrderModal/ConfirmOrderModal";



const Dashboard = () => {
  const { isDesktop, isTablet } = useScreenSize();

  const [selectedProduct, setSelectedProduct] = useState<ProductMenu | null>(
    null,
  );

  const [showOrderModal, setShowOrderModal] =
    useState(false);
  const [orderStage, setOrderStage] =
    useState<1 | 2>(1);

  const layoutProps = {
    onSelectProduct: setSelectedProduct,
  };

  return (
    <>
      {isDesktop && <DesktopLayout {...layoutProps}
        onOrder={() => {
          console.log("Dashboard");
          setShowOrderModal(true);
        }} />}

      {isTablet && <TabletLayout {...layoutProps}
        onOrder={() =>
          setShowOrderModal(true)
        } />}

      {!isDesktop && !isTablet && <MobileLayout {...layoutProps}
        onOrder={() =>
          setShowOrderModal(true)
        } />}

      <ConfirmOrderModal isOpen={showOrderModal}
        stage={orderStage}
        setStage={setOrderStage}
        onClose={() => {
          setShowOrderModal(false);
          setOrderStage(1);
        }}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
};

export default Dashboard;
