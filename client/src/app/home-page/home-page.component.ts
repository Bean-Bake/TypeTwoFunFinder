import { Component, OnInit } from '@angular/core';
import { BackEndService } from '../back-end.service';
import { Location } from '../location';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit 
{

  state: string = "";
  locations: Location[] = [];
  
  constructor(private backend: BackEndService) 
  {
    
   }

  ngOnInit()
  {
    this.getLocations();
  }

  getLocations(): void
  {
    this.backend.getLocations()
    .subscribe(response => 
      {
        this.locations = JSON.parse(JSON.stringify(response)).data.locations;
        //this.convertLocationToCoordinates();
      });
  }

}
