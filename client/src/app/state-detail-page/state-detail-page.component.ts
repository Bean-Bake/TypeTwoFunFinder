import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackEndService } from '../back-end.service';

@Component({
  selector: 'app-state-detail-page',
  templateUrl: './state-detail-page.component.html',
  styleUrls: ['./state-detail-page.component.css']
})
export class StateDetailPageComponent implements OnInit {

  state: string = "";

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

  getLocations(): void
  {

  }

}
