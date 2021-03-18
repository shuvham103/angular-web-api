import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register, User } from '../models/User';

const httpOptions={
  headers:new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  })
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { 
    
  }
  loginUrl:string = 'https://localhost:44339/token';
  SignupUrl:string='https://localhost:44339/api/Account/Register';

  Authenticate(user:User):Observable<any> {
    let abc="grant_type="+user.grant_type+"&username="+user.Username+"&password="+user.password;
    return this.http.post(this.loginUrl,abc);
  }


  Register(user:Register){
    return this.http.post(this.SignupUrl,user);
  }

}
