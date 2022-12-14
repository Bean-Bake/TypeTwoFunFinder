import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { LocationListComponent } from './location-list/location-list.component';
import { MapComponent } from './map/map.component';
import { StateDetailPageComponent } from './state-detail-page/state-detail-page.component';
import { StateListComponent } from './state-list/state-list.component';

const routes: Routes = [
  { path: 'locations', component: LocationListComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'state/:state', component: StateDetailPageComponent},
  { path: 'location/:id', component: LocationDetailsComponent },
  { path: 'home', component: HomePageComponent},
  { path: 'dashboard', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
