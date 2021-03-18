import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {}

    canActivate(){
      if(window.localStorage.getItem("TaskMgmt")!=null){
        return true;
      }
      else{
        this.router.navigate(['']);
        return false;
      }
    }
   
}
