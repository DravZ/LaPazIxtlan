import api from "./api";

export const login = (user: any) => {
    return api.post("/auth/login", user);
};