import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AddnewcontactComponent,HomeComponent} from './components';


const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'home/:id', component:HomeComponent},
  {path:'add',component:AddnewcontactComponent},
  {path:'',redirectTo:'home',pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareerRoutingModule { }
