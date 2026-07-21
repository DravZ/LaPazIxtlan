import { Navigate } from "react-router-dom";
import { isAuthenticated, getRole } from "../../services/session.service";

interface ProtectedRouteProps {
    children: React.ReactNode;
    roles?: string[];
}

export default function ProtectedRoute({
    children,
    roles,
}: ProtectedRouteProps) {

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    if (roles && !roles.includes(getRole()!)) {
        switch (getRole()) {
            case "Administrador":
                return <Navigate to="/admin" replace />;

            case "Mesero":
                return <Navigate to="/mesero" replace />;

            case "Cajero":
                return <Navigate to="/caja" replace />;

            case "Cocina":
                return <Navigate to="/cocinero" replace />;

            default:
                return <Navigate to="/login" replace />;
        }
    }

    return children;
}