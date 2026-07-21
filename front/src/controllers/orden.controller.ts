import * as OrderService from '../services/orden.service'

export const createOrder = async (order: any) => {
    try {
        const response = await OrderService.createOrder(order);

        return response.data;
    } catch (error) {
        console.error("Error creando la orden:", error);
        throw error;
    }
};

export const getAllOrdenes = async () => {
    try {
        const response = await OrderService.getAllOrders();

        return response.data;

    } catch (error) {
        console.error("Error obteniendo ordenes:", error);
        throw error;
    }
};

export const getOrdenById = async (id: number) => {
    try {
        const response = await OrderService.getOrdenById(id);

        return response.data;

    } catch (error) {
        console.error("Error obteniendo orden :" + id, error);
        throw error;
    }
};

export const getOrdenesPendientes = async () => {
    try {
        const response = await OrderService.getAllOrders();

        const ordenesPendientes = response.data.filter(
            (orden: any) => orden.estado === "Pendiente"
        );

        return ordenesPendientes;

    } catch (error) {
        console.error("Error obteniendo ordenes pendientes:", error);
        throw error;
    }
};

export const getOrdenesPorEntregar = async () => {
    try {
        const response = await OrderService.getAllOrders();

        const ordenesPendientes = response.data.filter(
            (orden: any) => orden.estado === "Lista"
        );

        return ordenesPendientes;

    } catch (error) {
        console.error("Error obteniendo ordenes por entregar:", error);
        throw error;
    }
};

export const getOrdenesEnPreparación = async () => {
    try {
        const response = await OrderService.getAllOrders();

        const ordenesPendientes = response.data
            .filter(
                (orden: any) => orden.estado === "En Preparación"
            )
            .sort(
                (a: any, b: any) =>
                    new Date(b.hora_confirmacion).getTime() -
                    new Date(a.hora_confirmacion).getTime()
            );

        return ordenesPendientes;
    } catch (error) {
        console.error("Error obteniendo ordenes en preparación:", error);
        throw error;
    }
};

export const getOrdenesPreparadas_Dia = async () => {
    try {
        const response = await OrderService.getAllOrders();

        const hoy = new Date().toISOString().split("T")[0]; // Ej. "2026-07-19"

        const ordenesEntregadasHoy = response.data
            .filter((orden: any) => {
                const fechaEntrega = orden.hora_lista?.split("T")[0];

                return (
                    ["Lista", "Entregada"].includes(orden.estado) &&
                    fechaEntrega === hoy
                );
            })
            .sort(
                (a: any, b: any) =>
                    new Date(b.hora_lista).getTime() -
                    new Date(a.hora_lista).getTime()
            );

        return ordenesEntregadasHoy;
    } catch (error) {
        console.error("Error obteniendo ordenes en preparación:", error);
        throw error;
    }
};

export const marcarOrdenEnPreparacion = async (idOrden: number, idMesero: number, idMesa: number) => {

    const order = {
        estado: "En Preparación",
        id_mesero: idMesero,
        id_mesa: idMesa
    }
    try {
        const response = await OrderService.updateOrden(idOrden, order);

        return response.data;

    } catch (error) {
        console.error("Error marcando orden en preparacion:", error);
        throw error;
    }
}


export const descartarOrden = async (idOrden: number, motivo: string) => {

    const order = {
        estado: "Descartada",
        motivo_cancelacion: motivo
    }
    try {
        const response = await OrderService.updateOrden(idOrden, order);

        return response.data;

    } catch (error) {
        console.error("Error al cancelar la orden:", error);
        throw error;
    }
}

export const setOrdenPreparada = async (idOrden: number) => {

    const order = {
        estado: "Lista"
    }
    try {
        const response = await OrderService.updateOrden(idOrden, order);

        return response.data;

    } catch (error) {
        console.error("Error al marcar orden como lista para entregar:", error);
        throw error;
    }
}
export const entregarOrden = async (idOrden: number) => {

    const order = {
        estado: "Entregada"
    }
    try {
        const response = await OrderService.updateOrden(idOrden, order);

        return response.data;

    } catch (error) {
        console.error("Error al marcar orden como entregada:", error);
        throw error;
    }
}
