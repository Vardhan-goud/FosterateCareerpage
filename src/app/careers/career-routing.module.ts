import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddNewContactComponent, HomeComponent } from './components';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'home/:id/edit', component: AddNewContactComponent},
  { path: 'add', component: AddNewContactComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareerRoutingModule {}
