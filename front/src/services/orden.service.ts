import api from "./api";

export const createOrder = (order: any) => {
    return api.post("/ordenes", order);
};

/*export const getDetailsById = (id: number) => {
    return api.get("/menu/"+id);
}*/