import * as UserService from '../services/user.service'

export const createUser = async (newUser: any) => {

    try {
        const response = await UserService.registerUser(newUser);

        return response.data;

    } catch (error) {
        console.error("Error al registrar usuario:", error);
        throw error;
    }
}

export const getAllUsersActive = async () => {
    try {
        const response = await UserService.getAllUsers();

        const usuariosActivos = response.data.filter(
            (usuario: any) =>
                usuario.activo &&
                usuario.rol !== "Administrador"
        );

        return usuariosActivos;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw error;
    }
};
export const getUserById = async (id: number) => {

    try {
        const response = await UserService.getUserById(id);

        return response.data;

    } catch (error) {
        console.error(`Error al obtener usuario con id: ${id}`, error);
        throw error;
    }
}

export const editUser = async (idUser: number, user: any) => {

    try {
        const response = await UserService.updateUser(idUser, user);

        return response.data;

    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        throw error;
    }
}

export const deleteUser = async (idUser: number) => {

    const user = {
        activo: false
    }

    try {
        const response = await UserService.updateUser(idUser, user);

        return response.data;

    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        throw error;
    }
}
