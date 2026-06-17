// layouts/TabletLayout.tsx

import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import MainContent from "../components/menu/MainContent/MainContent";

const TabletLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <div className="row vh-100">

        <div className="col-3 border-end">

          <Sidebar />

          <button
            className="btn btn-primary w-100 mt-3"
            onClick={() => navigate("/panel")}
          >
            Abrir Panel
          </button>

        </div>

        <div className="col-9">
          <MainContent />
        </div>

      </div>
    </div>
  );
};

export default TabletLayout;