import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BackEndService } from '../back-end.service';
import { Location } from '../location';
import { CustomMarker } from '../custom-marker';
import { Router } from '@angular/router';
import { last } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit 
{
  center: google.maps.LatLngLiteral = {lat: 39.833333, lng: -98.583333};
  zoom = 4;

  icon: google.maps.Icon = 
  {
      url: "/assets/Carabiner.jpg",
      scaledSize: new google.maps.Size(20, 20),
  }

  @Input() locations: Location[] = [];
  @Input() state: string = "";
  customMarkers: CustomMarker[] = [];

  avgLat: number = 0;
  avgLng: number = 0;

  constructor(
    private http: HttpClient, 
    private backend: BackEndService,
    private router: Router
  ) 
  {
  }

  updateCenter()
  {
    this.center = {lat: this.avgLat, lng: this.avgLng}
    this.zoom = 5;
  }
    
  ngOnInit()
  {
    if (this.state.length === 0)
    {
      this.getLocations();
    }
    else
    {
      this.getLocationsByState(this.state);
    }
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if (this.state.length === 0)
    {
      this.getLocations();
    }
    else
    {
      this.getLocationsByState(this.state);
    }
  }

  getLocations(): void
  {
    this.backend.getLocations()
    .subscribe(response => 
    {
      this.locations = JSON.parse(JSON.stringify(response)).data.locations;
      this.convertLocationToCoordinates();
    });
  }

  getLocationsByState(state: string)
  {
    this.backend.getLocationsByState(state)
    .subscribe(response => 
    {
      this.locations = JSON.parse(JSON.stringify(response)).data.locations;
      this.convertLocationToCoordinates();
      this.updateCenter();
    });
  }

  convertLocationToCoordinates()
  {
    this.locations.forEach(location  => {

      this.avgLat = this.avgLat + Number(location.latitude);
      this.avgLng = this.avgLng + Number(location.longitude);

      const coords: google.maps.LatLngLiteral = {lat: Number(location.latitude!), 
        lng: Number(location.longitude!)};
        
        const icon: google.maps.Icon = 
        {
            url: "/assets/Carabiner.jpg",
            scaledSize: new google.maps.Size(20, 20),
        }

        const options: google.maps.MarkerOptions = {draggable: false, icon: icon, title: location.name!, clickable: true};

        const marker: CustomMarker = 
        {
          markerOptions: options,
          markerPosition: coords,
          id: location.id!,
        }
        
        this.customMarkers.push(marker);
    });

    this.avgLat = this.avgLat / (this.locations.length + 1);
    this.avgLng = this.avgLng / (this.locations.length + 1);
  };



  routeToLocation(id: number)
  {
    this.router.navigate([`/location/${id}`]);
  }
}
