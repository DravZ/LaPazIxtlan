// pages/Dashboard.tsx
import { useScreenSize } from "../../hooks/useScreenSize";
import DesktopLayout from "../../layouts/moduloCocina/DesktopLayout";
import MobileLayout from "../../layouts/moduloCocina/MobileLayout/MobileLayout";



const DashboardCocina = () => {
  const { isDesktop, isTablet } = useScreenSize();

  return (
    <>
      {(isDesktop || isTablet) && <DesktopLayout/>}

      {!isDesktop && !isTablet && <MobileLayout/>}
    </>
  );
};

export default DashboardCocina;
