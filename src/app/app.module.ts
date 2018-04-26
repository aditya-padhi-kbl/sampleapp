import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profiles/profile.component';
import { HeaderComponent } from './header/header.component';
import { HeaderService } from './header/header.service';
import { ApiService } from './services/apiService';
import { AppCardComponent } from './cardComponent/card.component';
import { CardService } from './cardComponent/card.service';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent, ProfileComponent, HeaderComponent, AppCardComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule
  ],
  providers: [
    HeaderService, ApiService, CardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
