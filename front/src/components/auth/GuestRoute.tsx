import { Navigate } from "react-router-dom";
import { getRole, isAuthenticated } from "../../services/session.service";

interface Props {
    children: React.ReactNode;
}

export default function GuestRoute({ children }: Props) {

    if (!isAuthenticated()) {
        return children;
    }

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