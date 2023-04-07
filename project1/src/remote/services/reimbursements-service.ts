import { authenticatedAppClient } from "../authenticated-app-client";

export const getListReimbursements = async () => {
    return await authenticatedAppClient.get('/reimbursements');
}