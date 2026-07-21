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
import { Navigate } from "react-router-dom";
import GuestRoute from "./components/auth/GuestRoute";
import ProtectedRoute from "./components/auth/ProtectedRoute";

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
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/mesero"
            element={
              <ProtectedRoute roles={["Administrador","Mesero"]}>
                <DashboardMesero />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cocinero"
            element={
              <ProtectedRoute roles={["Administrador","Cocina"]}>
                <DashboardCocina />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["Administrador"]}>
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/caja"
            element={
              <ProtectedRoute roles={["Administrador","Cajero"]}>
                <DashboardCaja />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />
          <Route path="*" element={<Navigate to="/1" replace />} />
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
