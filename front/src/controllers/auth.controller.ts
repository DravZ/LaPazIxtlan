import * as AuthService from '../services/auth.service'

export const login = async (credentials: any) => {

    try {
        const response = await AuthService.login(credentials);

        return response.data;

    } catch (error) {
        console.error("Error al  iniciar sesion:", error);
        throw error;
    }
}
