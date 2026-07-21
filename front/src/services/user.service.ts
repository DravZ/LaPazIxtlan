import api from "./api";

export const registerUser = (order: any) => {
    return api.post("/usuarios", order);
};
export const getAllUsers = () => {
    return api.get("/usuarios");
};

export const getUserById = (id: number) => {
    return api.get(`/usuarios/${id}`);
};

export const updateUser = (idUser: number, order: any) => {
    return api.patch(`/usuarios/${idUser}`, order);
};
