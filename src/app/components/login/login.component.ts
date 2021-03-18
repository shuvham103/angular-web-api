import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/service/login.service';
import { RegisterComponent } from '../pages/register/register.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public showSpinner:boolean=false; 

  username!: string;
  password!: string;

  constructor(private router: Router,private logins:LoginService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }
    ngOnInit() {
      window.localStorage.removeItem("TaskMgmt");
      this.showSpinner = false;
    }

    Register(){
      const dialogRef = this.dialog.open(RegisterComponent,{
        width:"600px",
        height:'400px'
      });
  
      dialogRef.afterClosed().subscribe(result => 
        {
          this._snackBar.open(result, "ok", {
            duration: 2000,
          });
        });
    }
  
    login() : void {
      this.showSpinner=true
      let abc = new User(this.username,this.password);
      this.logins.Authenticate(abc).
      subscribe(
        (suc)=>
        {
          window.localStorage.setItem("TaskMgmt",suc["access_token"]) 
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
          this._snackBar.open(err.error.error_description, "ok", {
            duration: 2000,
          });
        },
        ()=>
        {
          
        }
      )
    }


    
  }