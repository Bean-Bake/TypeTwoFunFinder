import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BackEndService } from '../back-end.service';
import { Forecast } from '../forecast';
import { Location } from '../location';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  @Input() location: Location = {};
  
  currentForecast: Forecast = {};
  currentDate: Date = new Date();
  extendedForecast: Forecast[] = [];


  constructor(
    private http: HttpClient, 
    private backend: BackEndService
  ) { }

  ngOnInit(): void 
  {
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if (this.location.latitude && this.location.longitude)
    {
      this.getCurrentForecast();
      this.getFiveDayForecast();
    }
  }

  getCurrentForecast(): void
  {
    this.backend.getWeather(this.location.latitude!, this.location.longitude!)
      .subscribe(response => 
      {

        const result = JSON.parse(JSON.stringify(response));
      /*   this.weather.coord = result.coord;
        this.weather.weather = result.weather[0];
        this.weather.base = result.base;
        this.weather.main = result.main;
        this.weather.visibility = result.visbility;
        this.weather.wind = result.wind;
        this.weather.rain = result.rain;
        this.weather.clouds = result.clouds;
        this.weather.dt = result.dt;
        this.weather.sys = result.sys;
        this.weather.timezone = result.timezone;
        this.weather.id = result.id;
        this.weather.name = result.name;
        this.weather.cod = result.cod;
        this.weather.dt_txt = result.dt_txt; */
        this.currentForecast = result.weather;
        var weather = result.weather[0];
        this.currentForecast.weather = weather;
      });
  }

  getFiveDayForecast(): void
  {
    this.backend.getForecast(this.location.latitude!, this.location.longitude!)
    .subscribe(response => 
    {
      const result = JSON.parse(JSON.stringify(response)).list;

      result.forEach((element: any) => {
        /* var forecast: Forecast = {};
        forecast.weather = element.weather[0];
        forecast.base = element.base;
        forecast.main = element.main;
        forecast.visibility = element.visbility;
        forecast.wind = element.wind;
        forecast.rain = element.rain;
        forecast.clouds = element.clouds;
        forecast.dt = element.dt;
        forecast.sys = element.sys;
        forecast.timezone = element.timezone;
        forecast.id = element.id;
        forecast.name = element.name;
        forecast.cod = element.cod; 
        this.extendedForecast.push(forecast); */
        
        var forecast: Forecast = {};
        forecast = element;
        var weather = element.weather[0];
        forecast.weather = weather;
        this.extendedForecast.push(forecast);
      })
    });
  }
}
