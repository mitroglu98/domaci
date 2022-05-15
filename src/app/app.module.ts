import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigacijaComponent } from './navigacija/navigacija.component';
import { ProizvodiComponent } from './proizvodi/proizvodi.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DodavanjeComponent } from './proizvodi/dodavanje/dodavanje.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigacijaComponent,
    ProizvodiComponent,
    DodavanjeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
