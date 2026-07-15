import * as MenuService from "../services/menu.service";

export const getAllMenu = async () => {
    try {
        const response = await MenuService.getAll();

        return response.data.flatMap((category: any) =>
            category.productos.map((producto: any) => ({
                ...producto,
                id_categoria: category.id_categoria,
                nombre_categoria: category.nombre_categoria,
            }))
        );

    } catch (error) {
        console.error("Error obteniendo menu:", error);
        throw error;
    }
};

export const getProductDetailsById = async (id: number) => {
    try {
        const response = await MenuService.getDetailsById(id);

        const productInfo = response.data;

        const productModified = {
            ...productInfo,
            hasToppings: productInfo.toppings && productInfo.toppings.length > 0,
            toppings: productInfo.toppings?.map((topping: any) => ({
                ...topping,
                quantity: 1
            })) ?? []
        };

        return productModified;

    } catch (error) {
        console.error("Error obteniendo detalles del producto:", error);
        throw error;
    }
};