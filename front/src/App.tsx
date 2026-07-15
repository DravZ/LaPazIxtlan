import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardMesero from "./pages/ModuloMesero/Dashboard";
import Dashboard from "./pages/ModuloMenu/Dashboard";
import AboutPage from "./pages/ModuloAbout/AboutPage";
import DashboardCocina from "./pages/moduloCocina/CocineroPage";
import DashboardAdmin from "./pages/moduloAdmin/AdminPage";
import DashboardCaja from "./pages/moduloCaja/Dashboard";
import { OrderMenuProvider } from "./context/moduloMenu/OrderMenuContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <OrderMenuProvider>
            <Dashboard />
          </OrderMenuProvider>
        } />
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/mesero" element={<DashboardMesero />} />
        <Route path="/cocinero" element={<DashboardCocina />} />
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/caja" element={<DashboardCaja />} />
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
