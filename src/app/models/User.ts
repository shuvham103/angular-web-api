export class User{
    Username:string;
    password:string;
    grant_type:string='password';
    constructor(username:string,password:string){
        this.Username=username;
        this.password=password;
    }
}


export class Register{
    Email:string
    Password:string
    ConfirmPassword:string
    role:string = "Admin"
    constructor(email:string, password:string, confirm:string){
        this.Email=email;
        this.Password=password;
        this.ConfirmPassword=confirm;   
    }
}