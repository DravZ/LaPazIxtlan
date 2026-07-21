import { useEffect } from "react";
import { socket } from "../services/socket.service";

export interface ActualizacionOrden {
    tipo: "creada" | "actualizada" | "eliminada";
    estado?: string;
    id_orden?: number;
}

export const useOrdenesSocket = (
    callback: (evento: ActualizacionOrden) => void
) => {

    useEffect(() => {

        socket.on("actualizacionOrdenes", callback);

        return () => {
            socket.off("actualizacionOrdenes", callback);
        };

    }, [callback]);

};