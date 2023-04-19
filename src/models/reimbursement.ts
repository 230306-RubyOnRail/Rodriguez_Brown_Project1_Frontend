// Testing Reimbursement statement

export class Reimbursement {
    id: number;
    description: string;
    amount: number;
    status: number; // Status: 1,2,3 => Approved, Pending, Denied
    name: string;

    constructor(id: number, description: string, amount: number, status: number, name: string) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.status = status;
        this.name = name;
    }
}