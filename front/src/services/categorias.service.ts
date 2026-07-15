import api from "./api"; 

export const getAll = () => {
    return api.get("/categorias-menu");
};