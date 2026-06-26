// pages/Dashboard.tsx
import { useScreenSize } from "../../hooks/useScreenSize";
import DesktopLayout from "../../layouts/moduloAdmin/DesktopLayout";
import MobileLayout from "../../layouts/moduloAdmin/MobileLayout/MobileLayout";



const DashboardAdmin = () => {
  const { isDesktop, isTablet } = useScreenSize();

  return (
    <>
      {(isDesktop || isTablet) && <DesktopLayout/>}

      {!isDesktop && !isTablet && <MobileLayout/>}
    </>
  );
};

export default DashboardAdmin;
