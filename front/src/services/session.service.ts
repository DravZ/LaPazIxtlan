const TOKEN_KEY = "token";
const ROLE_KEY = "rol";
const USER_ID_KEY = "id";

export const saveSession = (data: {
    token: string;
    rol: string;
    id: number;
}) => {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(ROLE_KEY, data.rol);
    localStorage.setItem(USER_ID_KEY, data.id.toString());
};

export const clearSession = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(USER_ID_KEY);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getRole = () => localStorage.getItem(ROLE_KEY);

export const getUserId = () => {
    const id = localStorage.getItem(USER_ID_KEY);
    return id ? Number(id) : null;
};

export const isAuthenticated = () => !!getToken();