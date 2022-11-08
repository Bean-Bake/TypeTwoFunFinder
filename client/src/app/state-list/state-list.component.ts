import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { BackEndService } from '../back-end.service';
import { Location } from '../location';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.css']
})
export class StateListComponent implements OnInit {

  @Input() state: string = "";
  @Input() locations: Location[] = [];

  constructor(
    private http: HttpClient, 
    private backend: BackEndService
  ) 
  { 

  }

  ngOnInit(): void 
  {
    
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if (this.state)
    {
      this.getLocations();
    }
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
