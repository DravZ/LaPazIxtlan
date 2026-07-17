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

  const [selectedProduct, setSelectedProduct] = useState<number | null>(
    null,
  );

  const [showOrderModal, setShowOrderModal] =
    useState(false);
  const [orderStage, setOrderStage] =
    useState<1 | 2>(1);

  const layoutProps = {
    onSelectProduct: setSelectedProduct,
  };

  const [category, setCategory] = useState("Todos");

  console.log("selectedProduct:", selectedProduct);

  return (
    <>
      {isDesktop && <DesktopLayout {...layoutProps}
        category= {category}
        setCategory={setCategory}
        onOrder={() => {
          setShowOrderModal(true);
        }} />}

      {isTablet && <TabletLayout {...layoutProps}
        category= {category}
        setCategory={setCategory}
        onOrder={() =>
          setShowOrderModal(true)
        } />}

      {!isDesktop && !isTablet && <MobileLayout {...layoutProps}
        category= {category}
        setCategory={setCategory}
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
        productId={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
};

export default Dashboard;
