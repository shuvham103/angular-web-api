import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BodyComponent} from './components/body/body.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { AddComponent } from './components/pages/add/add.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {path: '',component:BodyComponent},
  {path: 'login',component:LoginComponent},
  {path: 'add',component:AddComponent,canActivate:[AuthGuardService]},
  {path: 'edit/:id',component:AddComponent},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
