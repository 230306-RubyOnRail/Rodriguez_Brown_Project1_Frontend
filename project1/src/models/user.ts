export class User{
    token: string;
    user_id: number;
    constructor(token: string, user_id: number) {
        this.token = token;
        this.user_id = user_id;
    }
}