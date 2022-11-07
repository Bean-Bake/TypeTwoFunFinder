import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BackEndService } from '../back-end.service';
import { Location } from '../location';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

  location: Location = {};
  constructor(
    private router: Router,
    private backend: BackEndService)
  { 

  }

  ngOnInit(): void 
  {
    this.getLocation(parseInt(this.router.url.split('/')[2]));
  }

  ngOnChanges(changes: SimpleChanges)
  {
    this.getLocation(parseInt(this.router.url.split('/')[2]));
  }

  getLocation(id: number): void
  {
    this.backend.getLocation(id)
      .subscribe(response => 
      {
        this.location = JSON.parse(JSON.stringify(response)).data.location;
      });
  }
}
