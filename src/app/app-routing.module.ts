import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BodyComponent} from './components/body/body.component';
import { AddComponent } from './components/pages/add/add.component';

const routes: Routes = [
  {path: '',component:BodyComponent},
  {path: 'add',component:AddComponent},
  {path:'**',component:BodyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
