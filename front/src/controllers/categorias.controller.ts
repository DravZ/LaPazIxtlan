import * as CategoriaService from "../services/categorias.service";

export const getCategorias = async () => {
    try {
        const response = await CategoriaService.getAll();

        return response.data;
    } catch (error) {
        console.error("Error obteniendo categorías:", error);
        throw error;
    }
};