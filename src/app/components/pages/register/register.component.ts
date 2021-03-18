import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Register } from 'src/app/models/User';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  mySignUpForm!:FormGroup;
  constructor(
    public dialogRefs:MatDialogRef<RegisterComponent>,
    private login:LoginService
  ) { }

  ngOnInit(): void {
    this.mySignUpForm= new FormGroup({
      'Email': new FormControl(null, Validators.required),
      'Password': new FormControl(null, Validators.required),
      'ConfirmPassword': new FormControl(null,[Validators.required]),
    })

  }


  handleSubmit()
  {
    let register = new Register(this.mySignUpForm.value.Email, this.mySignUpForm.value.Password, this.mySignUpForm.value.ConfirmPassword)
    this.login.Register(register).subscribe(
      (suc)=>
      {
        this.dialogRefs.close("User Created. Please Login")
      },
      (err)=>
      {
        debugger
        console.log(err);
        this.dialogRefs.close(err.error.ModelState[""][0]);
      }
    )
  }

  get f()
  {
    return this.mySignUpForm.controls;
  }






}
