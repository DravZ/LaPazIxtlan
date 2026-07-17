// pages/Dashboard.tsx

import { useState } from "react";

import { useScreenSize } from "../../hooks/useScreenSize";

import ProductModal from "../../components/moduloMenu/ProductModal/ProductModal";
import DesktopLayout from "../../layouts/ModuloMeseros/DesktopLayout";
import TabletLayout from "../../layouts/ModuloMeseros/TabletLayout";
import MobileLayout from "../../layouts/ModuloMeseros/MobileLayout/MobileLayout";
import type { ProductMenu } from "../../interfaces/ModuloMenu/ProductMenu";

const DashboardMesero = () => {
  const { isDesktop, isTablet } = useScreenSize();

  return (
    <>
      {isDesktop && <DesktopLayout  />}

      {isTablet && <TabletLayout  />}

      {!isDesktop && !isTablet && <MobileLayout />}

    </>
  );
};

export default DashboardMesero;
