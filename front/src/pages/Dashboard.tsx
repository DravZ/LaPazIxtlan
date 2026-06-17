// pages/Dashboard.tsx

import DesktopLayout from "../layouts/DesktopLayout";
import TabletLayout from "../layouts/TabletLayout";
import MobileLayout from "../layouts/MobileLayout";

import { useScreenSize } from "../hooks/useScreenSize";

const Dashboard = () => {
  const {
    isDesktop,
    isTablet,
  } = useScreenSize();

  if (isDesktop) {
    return <DesktopLayout />;
  }

  if (isTablet) {
    return <TabletLayout />;
  }

  return <MobileLayout />;
};

export default Dashboard;