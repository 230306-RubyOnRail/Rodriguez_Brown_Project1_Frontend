import { authenticatedAppClient } from "../authenticated-app-client";

export const deleteUser = async (id:number) => {
    return await authenticatedAppClient.delete(`./users/${id}`);
}

export const getListUser = async () => {
    return await authenticatedAppClient.get('/users');
}

export const createUser = async (items: {username:string, password:string, name:string, admin:boolean}) => {
    return await authenticatedAppClient.post(`/users`, items);
}
