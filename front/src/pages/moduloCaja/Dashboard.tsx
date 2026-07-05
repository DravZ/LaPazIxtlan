// pages/Dashboard.tsx
import { useScreenSize } from "../../hooks/useScreenSize";
import DesktopLayout from "../../layouts/moduloCaja/DesktopLayout/DesktopLayout";
import TabletLayout from "../../layouts/moduloCaja/TabletLayout/TabletLayout";


const DashboardCaja = () => {
  const { isDesktop } = useScreenSize();

  return (
    <div className="row m-0 p-0 w-100 p-100">
      {isDesktop && <DesktopLayout isDesktop= {isDesktop}/>}

      {!isDesktop && <TabletLayout/>}
    </div>
  );
};

export default DashboardCaja;
