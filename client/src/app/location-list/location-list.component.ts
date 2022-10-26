import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BackEndService } from '../back-end.service';
import { Location } from '../location';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit 
{
  locations: Location[] = [];
  states: string[] = [];
  locationMap: Map<string, Location[]> = new Map<string, Location[]>();

  constructor(
    private http: HttpClient, 
    private backend: BackEndService) 
  { 

  }

  ngOnInit(): void 
  {
    this.getStates();
  }

  getLocationsByState(state: string)
  {
    this.backend.getLocationsByState(state)
      .subscribe(response => 
      {
        this.locations = JSON.parse(JSON.stringify(response)).data.locations;
      });
  }
  getLocations(): void
  {
    this.backend.getLocations()
      .subscribe(response => 
      {
        this.locations = JSON.parse(JSON.stringify(response)).data.locations;
      });
  }

  getStates(): void
  {
    this.backend.getStates()
      .subscribe(response => 
      {
        const results: string[] = JSON.parse(JSON.stringify(response)).states;
        results.forEach(element => {
          this.states.push(JSON.parse(JSON.stringify(element)).name);
        });
      });
  }
}
