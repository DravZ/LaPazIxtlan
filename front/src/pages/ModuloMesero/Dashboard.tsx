// pages/Dashboard.tsx

import { useState } from "react";

import { useScreenSize } from "../../hooks/useScreenSize";

import ProductModal from "../../components/moduloMenu/ProductModal/ProductModal";
import DesktopLayout from "../../layouts/ModuloMeseros/DesktopLayout";
import TabletLayout from "../../layouts/ModuloMeseros/TabletLayout";
import MobileLayout from "../../layouts/ModuloMeseros/MobileLayout/MobileLayout";
import type { ProductMenu } from "../../interfaces/ProductMenu";

const DashboardMesero = () => {
  const { isDesktop, isTablet } = useScreenSize();

  const [selectedProduct, setSelectedProduct] = useState<ProductMenu | null>(
    null,
  );

  const layoutProps = {
    onSelectProduct: setSelectedProduct,
  };

  return (
    <>
      {isDesktop && <DesktopLayout {...layoutProps} />}

      {isTablet && <TabletLayout {...layoutProps} />}

      {!isDesktop && !isTablet && <MobileLayout {...layoutProps} />}

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
};

export default DashboardMesero;
