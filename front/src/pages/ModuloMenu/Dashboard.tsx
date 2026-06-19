// pages/Dashboard.tsx

import { useState } from "react";
import { useScreenSize } from "../../hooks/useScreenSize";
import type { ProductMenu } from "../../interfaces/ModuloMenu/ProductMenu";
import DesktopLayout from "../../layouts/ModuloMenu/DesktopLayout";
import TabletLayout from "../../layouts/ModuloMenu/TabletLayout";
import MobileLayout from "../../layouts/ModuloMenu/MobileLayout/MobileLayout";
import ProductModal from "../../components/moduloMenu/ProductModal/ProductModal";
import { LucideAArrowDown } from "lucide-react";



const Dashboard = () => {
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

export default Dashboard;
