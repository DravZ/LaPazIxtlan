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

export const getEnPreparación = async () => {
    try {
        const response = await OrderService.getAllOrders();

        const ordenesPendientes = response.data.filter(
            (orden: any) => orden.estado === "En Preparación"
        );

        return ordenesPendientes;

    } catch (error) {
        console.error("Error obteniendo ordenes en preparación:", error);
        throw error;
    }
};
