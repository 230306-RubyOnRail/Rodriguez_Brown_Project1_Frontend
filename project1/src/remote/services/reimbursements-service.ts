import { authenticatedAppClient } from "../authenticated-app-client";

export const getListReimbursements = async () => {
    return await authenticatedAppClient.get('/reimbursements');
}

export const deleteReimbursement = async (id:number) => {
    return await authenticatedAppClient.delete(`/reimbursements/${id}`);
}