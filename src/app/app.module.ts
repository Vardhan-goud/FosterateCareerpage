import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AllcontactsdataService } from './allcontactsdata.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormpopupComponent } from './formpopup/formpopup.component';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { ContactsviewComponent } from './contactsview/contactsview.component';
import { DisplaayActiveContactComponent } from './displaay-active-contact/displaay-active-contact.component'


@NgModule({

  declarations: [
    AppComponent,
    FormpopupComponent,
    HomeComponent,
    AddComponent,
    ContactsviewComponent,
    DisplaayActiveContactComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],

  providers: [AllcontactsdataService],
  
  bootstrap: [AppComponent]

})

export class AppModule { }
