import { Injectable } from '@angular/core';
import { Location } from './location';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BackEndService 
{

  constructor(private http: HttpClient) 
  {
    
  }

  getLocations(): Observable<Location[]>
  {
    return this.http.get<Location[]>(`${environment.api}/locations`);
  }

  getLocation(id: number): Observable<Location>
  { 
    return this.http.get<Location>(`${environment.api}/locations/${id}`);
  }

  getLocationsByState(state: string): Observable<Location[]>
  {
    return this.http.get<Location[]>(`${environment.api}/locations/fromstate/${state}`);
  }

  getStates(): Observable<string[]>
  {
    return this.http.get<string[]>(`${environment.api}/locations/states`);
  }

  getWeather(latitude: number, longitude: number)
  {
    return this.http.get<string>(`${environment.api}/weather/${latitude}/${longitude}`);
  }

  getForecast(latitude: number, longitude: number)
  {
    return this.http.get<string>(`${environment.api}/forecast/${latitude}/${longitude}`);
  }
  getMap()
  {
    return this.http.get(`${environment.api}/map`);
  }

  searchPhrase(query: string)
  {
    return this.http.get<Observable<Location[]>>(`${environment.api}/locations/search/${query}`);
  }
}
