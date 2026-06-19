import { BrowserRouter, Routes, Route } from "react-router-dom";
import PanelPage from "./pages/PanelPage";
import DashboardMesero from "./pages/ModuloMesero/Dashboard";
import Dashboard from "./pages/ModuloMenu/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/panel" element={<PanelPage />} />
        <Route path="/mesero" element={<DashboardMesero />} />
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
