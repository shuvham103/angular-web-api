import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/service/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public showSpinner:boolean=false; 

  username!: string;
  password!: string;

  constructor(private router: Router,private logins:LoginService) { }
    ngOnInit() {
      window.localStorage.removeItem("TaskMgmt");
      this.showSpinner = false;
    }

    
  
    login() : void {
      this.showSpinner=true
      let abc = new User(this.username,this.password);
      this.logins.Authenticate(abc).
      subscribe(
        (suc)=>
        {
          async function setTokens(){
            window.localStorage.setItem("TaskMgmt",suc["access_token"])  
            return "done";
          }        
          console.log(suc);
          this.showSpinner=false;
          setTokens().then(
            ()=>
            {
              this.router.navigate(['']);
            }
          )
            
          
        },
        (err)=>
        {
          console.log(err);
          this.showSpinner=false;
        },
        ()=>
        {
          
        }
      )
    }


    
  }