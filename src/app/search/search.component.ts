import { Component, ViewChild } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Trip } from '../models/trip';
import { take } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


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
  selectedCheckboxes: Array<string> = [];

  constructor(private searchService: SearchService) { 
    searchService.getTrips().pipe(take(1)).subscribe(trip => {
      this.trips = trip;
      this.filterPlace(this.trips);
    });
    this.filteredTrips = this.trips.slice(0, 6);
  }

  selectPlace(event: any) {
    const tripName = event.source.value;
    if (event.checked === true) {
      this.selectedCheckboxes.push(tripName);
      this.filterTrips();
      if (this.filteredTrips.length > 6) {
        this.filteredTrips = this.trips.slice(0, 6);
      }
    } else {
      const checkbox = this.selectedCheckboxes.indexOf(tripName);
      this.selectedCheckboxes.splice(checkbox, 1);
      this.filterTrips();
      if (this.filteredTrips.length === 0) {
        this.filteredTrips = this.trips;
      }
    }
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.trips.length) {
      endIndex = this.trips.length;
    }
    this.filteredTrips = this.trips.slice(startIndex, endIndex);
  }

  private filterTrips() {
    this.filteredTrips = this.trips.filter(trip => this.selectedCheckboxes.includes(trip.title));
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
