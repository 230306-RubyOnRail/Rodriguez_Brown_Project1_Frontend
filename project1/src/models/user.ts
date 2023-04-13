export class User{
    token: string;
    user_id: number;
    admin: boolean;
    name: string;
    
    constructor(token: string, user_id: number, admin: boolean, name: string) {
        this.token = token;
        this.user_id = user_id;
        this.admin = admin;
        this.name = name;
    }
}