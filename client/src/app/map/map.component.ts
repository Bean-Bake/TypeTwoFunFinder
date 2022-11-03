import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { BackEndService } from '../back-end.service';
import { Location } from '../location';
import { CustomMarker } from '../custom-marker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  
  options: google.maps.MapOptions = {
    center: {lat: 39.833333, lng: -98.583333},
    zoom: 4
  }

  icon: google.maps.Icon = 
  {
      url: "/assets/Carabiner.jpg",
      scaledSize: new google.maps.Size(20, 20),
  }

  locations: Location[] = [];
  customMarkers: CustomMarker[] = [];

  constructor(
    private http: HttpClient, 
    private backend: BackEndService,
    private router: Router
  ) 
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
        this.convertLocationToCoordinates();
      });
  }

  convertLocationToCoordinates()
  {
    this.locations.forEach(location  => {

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
    })
  }

  routeToLocation(id: number)
  {
    this.router.navigate([`/location/${id}`]);
  }
}
