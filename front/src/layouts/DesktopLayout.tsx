// layouts/DesktopLayout.tsx

import Sidebar from "../components/Sidebar";
import MainContent from "../components/menu/MainContent/MainContent";
import SecondaryPanel from "../components/SecondaryPanel";

const DesktopLayout = () => {
  return (
    <div className="container-fluid">
      <div className="row vh-100">

        <div className="col-2 border-end p-0">
          <Sidebar />
        </div>

        <div className="col-8 p-0">
          <MainContent />
        </div>

        <div className="col-2 border-start p-0">
          <SecondaryPanel />
        </div>

      </div>
    </div>
  );
};

export default DesktopLayout;