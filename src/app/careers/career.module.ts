import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from '@angular/forms';
import { CareerRoutingModule } from './career-routing.module';
// import { HomeComponent } from './components/home/home.component';
// import { AllcontactsviewComponent } from './components/allcontactsview/allcontactsview.component';
// import { ActivecontactviewComponent } from './components/activecontactview/activecontactview.component';
// import { ContactsformComponent } from './components/contactsform/contactsform.component';
// import { AddnewcontactComponent } from './components/addnewcontact/addnewcontact.component';
import { ContactsdataService } from './services';
import {HomeComponent,AddnewcontactComponent,AllcontactsviewComponent,ContactsformComponent,ActivecontactviewComponent} from './components'
// import {Contact} from './contactdefinition.model';



@NgModule({
  declarations: [
   
  
    HomeComponent,
    AllcontactsviewComponent,
    ActivecontactviewComponent,
    ContactsformComponent,
    AddnewcontactComponent
  ],
  imports: [
    CommonModule,
    CareerRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    ContactsdataService,
  ],
  exports:
  [
    HomeComponent,
    AllcontactsviewComponent,
    ActivecontactviewComponent,
    ContactsformComponent,
    AddnewcontactComponent
  ]
})
export class CareerModule { }
