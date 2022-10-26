import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Forecast } from '../forecast';

@Component({
  selector: 'app-weather-box',
  templateUrl: './weather-box.component.html',
  styleUrls: ['./weather-box.component.css']
})
export class WeatherBoxComponent implements OnInit {

  forecastList: Forecast[] = [];
  @Input() forecast: Forecast = {};
  @Input() date: Date | undefined;

  constructor() { }

  ngOnInit(): void 
  {
  }

  ngOnChanges(changes: SimpleChanges)
  {
    
  }

}
