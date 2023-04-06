// Testing Reimbursement statement

export class Reimbursement {
    id: number;
    description: string;
    amount: number;
    
    constructor(id: number, description: string, amount: number){
        this.id = id;
        this.description = description;
        this.amount = amount;
    }
}