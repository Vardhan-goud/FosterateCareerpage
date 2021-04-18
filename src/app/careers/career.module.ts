import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CareerRoutingModule } from './career-routing.module';
import { ContactsdataService } from './services';
import { HomeComponent, AddnewcontactComponent, AllcontactsviewComponent, ContactsformComponent, ActivecontactviewComponent } from './components';

@NgModule({
  declarations: [ HomeComponent, AllcontactsviewComponent, ActivecontactviewComponent, ContactsformComponent, AddnewcontactComponent,
  ],
  imports: [ CommonModule, CareerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ContactsdataService],
})
export class CareerModule {}
