// pages/Dashboard.tsx

import { useState } from "react";

import { useScreenSize } from "../hooks/useScreenSize";

import DesktopLayout from "../layouts/DesktopLayout";
import TabletLayout from "../layouts/TabletLayout";
import MobileLayout from "../layouts/MobileLayout/MobileLayout";

import ProductModal from "../components/ProductModal/ProductModal";
import type { ProductMenu } from "../interfaces/ProductMenu";

const Dashboard = () => {
  const {
    isDesktop,
    isTablet,
  } = useScreenSize();

  const [selectedProduct, setSelectedProduct] =
    useState<ProductMenu | null>(null);

  const layoutProps = {
    onSelectProduct: setSelectedProduct,
  };

  return (
    <>
      {isDesktop && (
        <DesktopLayout {...layoutProps} />
      )}

      {isTablet && (
        <TabletLayout {...layoutProps} />
      )}

      {!isDesktop && !isTablet && (
        <MobileLayout {...layoutProps} />
      )}

      <ProductModal
        product={selectedProduct}
        onClose={() =>
          setSelectedProduct(null)
        }
      />
    </>
  );
};

export default Dashboard;