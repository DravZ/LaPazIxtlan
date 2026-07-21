import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardMesero from "./pages/ModuloMesero/Dashboard";
import Dashboard from "./pages/ModuloMenu/Dashboard";
import AboutPage from "./pages/ModuloAbout/AboutPage";
import DashboardCocina from "./pages/moduloCocina/CocineroPage";
import DashboardAdmin from "./pages/moduloAdmin/AdminPage";
import DashboardCaja from "./pages/moduloCaja/Dashboard";
import { OrderMenuProvider } from "./context/moduloMenu/OrderMenuContext";
import { NotificationProvider } from "./context/notifications/NotificationContext";
import { LoginPage } from "./pages/Login/LoginPage";

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/:id" element={
          <OrderMenuProvider>
            <Dashboard />
          </OrderMenuProvider>
        } />
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/mesero" element={<DashboardMesero />} />
        <Route path="/cocinero" element={<DashboardCocina />} />
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/caja" element={<DashboardCaja />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={
          <OrderMenuProvider>
            <Dashboard />
          </OrderMenuProvider>
        } />
      </Routes>
    </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
