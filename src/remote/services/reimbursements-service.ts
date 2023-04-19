import { authenticatedAppClient } from "../authenticated-app-client";

export const getListReimbursements = async () => {
    return await authenticatedAppClient.get('/reimbursements');
}

export const deleteReimbursement = async (id:number) => {
    return await authenticatedAppClient.delete(`/reimbursements/${id}`);
}

export const updateReimbursement = async (id:number, items: {description:string, amount:number}) => {
    return await authenticatedAppClient.put(`/reimbursements/${id}`, items);
}

export const updateReimbursementAdmin = async (id:number, items: {status:number}) => {
    return await authenticatedAppClient.put(`/reimbursements/${id}`, items);
}

export const createReimbursement = async (items: {description:string, amount:number}) => {
    return await authenticatedAppClient.post(`/reimbursements`, items);
}