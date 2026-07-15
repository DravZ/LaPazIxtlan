import api from "./api"; 

export const getAll = () => {
    return api.get("/menu/completo");
};

export const getDetailsById = (id: number) => {
    return api.get("/menu/"+id);
}