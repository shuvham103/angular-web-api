export class User{
    Username:string;
    password:string;
    grant_type:string='password';
    constructor(username:string,password:string){
        this.Username=username;
        this.password=password;
    }
}