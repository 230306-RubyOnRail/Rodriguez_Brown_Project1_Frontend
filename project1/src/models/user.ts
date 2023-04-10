export class User{
    token: string;
    user_id: number;
    admin: boolean;
    constructor(token: string, user_id: number, admin: boolean) {
        this.token = token;
        this.user_id = user_id;
        this.admin = admin;
    }
}