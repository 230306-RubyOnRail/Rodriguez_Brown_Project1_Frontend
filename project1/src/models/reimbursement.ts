// Testing Reimbursement statement

export class Reimbursement {
    id: number;
    user_id: number;
    description: string;
    amount: number;
    status: number; // Status: 1,2,3 => Approved, Pending, Denied
    
    constructor(id: number, user_id: number, description: string, amount: number, status: number) {
        this.id = id;
        this.user_id = user_id;
        this.description = description;
        this.amount = amount;
        this.status = status;
    }
}