import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CareerRoutingModule } from './career-routing.module';
import { HomeComponent, AddNewContactComponent, AllContactsViewComponent, ContactsFormComponent, ActiveContactViewComponent } from './components';


@NgModule({
  declarations: [ HomeComponent, AddNewContactComponent, AllContactsViewComponent, ContactsFormComponent, ActiveContactViewComponent
  ],
  imports: [ CommonModule, CareerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class CareerModule {}
