import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackEndService } from '../back-end.service';
import { Location } from '../location';

@Component({
  selector: 'app-state-detail-page',
  templateUrl: './state-detail-page.component.html',
  styleUrls: ['./state-detail-page.component.css']
})
export class StateDetailPageComponent implements OnInit {

  state: string = "";
  locations: Location[] = [];

  constructor(
    private router: Router,
    private backend: BackEndService
  ) 
  { 
    this.state = this.router.url.split("/")[2];
  }

  ngOnInit(): void 
  {

  }

  getLocations()
  {
    this.backend.getLocationsByState(this.state)
    .subscribe(response => 
      {
        this.locations = JSON.parse(JSON.stringify(response)).data.locations;
      });
  }

}
