import { Component } from '@angular/core';
import TRIPS from 'src/assets/karty/wycieczki';
import { SearchService } from '../services/search.service';
import { Trip } from '../models/trip';
import { Observable, Subscription, map, take, tap } from 'rxjs';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  trips!: Array<Trip>;
  filteredTrips!: Array<Trip>;
  fromPlaces = ['Warszawa', 'Kraków', 'Gdańsk', 'Wrocław'];
  toPlaces: Array<string> = [];
  tripOptions = ['All-inclusive', 'Last minute', 'City Break'];

  constructor(private searchService: SearchService) { 
    searchService.getTrips().pipe(take(1)).subscribe(trip => {
      this.trips = trip;
      this.filterPlace(this.trips);
    });
    this.filteredTrips = this.trips;
  }

  selectPlace(event: any) {

    if (event.checked === true) {
      // this.filteredTrips = this.trips.filter((trip) => trip.title === event.source.value);
      this.filteredTrips.concat(this.trips.filter((trip) => trip.title === event.source.value));
    } else {
      this.filteredTrips = this.trips;
    }
  }

  private filterPlace(trips: Trip[]) {
   trips.forEach(trip => {
      if (this.toPlaces.includes(trip.title)){
        return
      } else {
        this.toPlaces.push(trip.title);
      }
    })
  }
}
