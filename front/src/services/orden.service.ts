import api from "./api";

export const createOrder = (order: any) => {
    return api.post("/ordenes", order);
};
export const getAllOrders = () => {
    return api.get("/ordenes");
};

export const updateOrden = (idOrden: number, order: any) => {

    return api.patch(`/ordenes/${idOrden}`, order);
};

/*export const getDetailsById = (id: number) => {
    return api.get("/menu/"+id);
}*/