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