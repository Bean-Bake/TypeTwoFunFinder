import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { LocationListComponent } from './location-list/location-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FooterComponent } from './footer/footer.component';
import { StateListComponent } from './state-list/state-list.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { StateDetailPageComponent } from './state-detail-page/state-detail-page.component';
import { ForecastComponent } from './forecast/forecast.component';
import { WeatherBoxComponent } from './weather-box/weather-box.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    LocationListComponent,
    HomePageComponent,
    FooterComponent,
    StateListComponent,
    LocationDetailsComponent,
    StateDetailPageComponent,
    ForecastComponent,
    WeatherBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
