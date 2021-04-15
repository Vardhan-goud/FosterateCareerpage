import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {AppComponent,NavigationComponent} from './Components';
import { CareerModule } from './careers/career.module';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CareerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
