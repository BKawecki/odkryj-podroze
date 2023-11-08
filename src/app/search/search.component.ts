import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Trip } from '../models/trip';
import { take } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  enteredCost!: number;
  displayedTrips: any[] = [];
  trips!: Array<Trip>;
  filteredTrips!: Array<Trip>;
  fromPlaces = ['Warszawa', 'Kraków', 'Gdańsk', 'Wrocław'];
  toPlaces: Array<string> = [];
  tripOptions = ['All-inclusive', 'Last minute', 'City Break'];
  selectedCheckboxes: Array<string> = [];

  constructor(private searchService: SearchService) {
    searchService
      .getTrips()
      .pipe(take(1))
      .subscribe((trip) => {
        this.trips = trip;
        this.filterPlace(this.trips);
      });
    this.filteredTrips = this.trips;
    this.displayedTrips = this.filteredTrips;
  }

  ngOnInit(): void {
    this.updateDisplayedTrips();

    this.paginator.page.subscribe(() => {
      this.updateDisplayedTrips();
    });
  }

  updateDisplayedTrips() {
    const pageSize = 6
    let startIndex = this.paginator.pageIndex * pageSize;
    let endIndex = startIndex + pageSize;
    if (endIndex > this.filteredTrips.length) {
      endIndex = this.filteredTrips.length
    }
    if (this.displayedTrips.length < pageSize) {
      this.paginator.pageIndex = 0;
    }
    this.displayedTrips = this.filteredTrips.slice(startIndex, endIndex);
  }

  selectPlace(event: any) {
    const tripName = event.source.value;
    if (event.checked === true) {
      this.selectedCheckboxes.push(tripName);
      this.filterTrips();
    } else {
      const checkbox = this.selectedCheckboxes.indexOf(tripName);
      this.selectedCheckboxes.splice(checkbox, 1);
      this.filterTrips();
      if (this.filteredTrips.length === 0) {
        this.filteredTrips = this.trips;
      }
    }
    this.updateDisplayedTrips();
  }

  onInput() {
      this.filterTrips();
  }

  // private filterTrips() {
  //   this.filteredTrips = this.trips.filter((trip) => {
  //     if (!this.selectedCheckboxes.length) {
  //       trip.cost <= this.enteredCost;
  //     }
  //     if (!this.enteredCost) {
  //       this.selectedCheckboxes.includes(trip.title);
  //     } 
  //     if (!this.enteredCost && !this.selectedCheckboxes.length) {
  //       return
  //     } else {
  //       this.selectedCheckboxes.includes(trip.title) && trip.cost <= this.enteredCost
  //     }
  //   });
  //   this.updateDisplayedTrips();
  // }
  private filterTrips() {
    this.filteredTrips = this.trips.filter((trip) => {
      const hasSelectedCheckboxes = this.selectedCheckboxes.length > 0;
      const hasEnteredCost = !!this.enteredCost;
      //czy jest data wpisana

      if (!hasSelectedCheckboxes && !hasEnteredCost) {
        return true;
      }

      const matchesCheckboxes = hasSelectedCheckboxes && this.selectedCheckboxes.includes(trip.title);
      const matchesCost = hasEnteredCost && trip.cost <= this.enteredCost;

      if (hasSelectedCheckboxes && hasEnteredCost) {
        return matchesCheckboxes && matchesCost;
      } else if (hasSelectedCheckboxes) {
        return matchesCheckboxes;
      } else if (hasEnteredCost) {
        return matchesCost;
      }
      return;
    });
    this.updateDisplayedTrips();
  }
  onDateChange(startDate: HTMLInputElement, endDate: HTMLInputElement) {
    console.log('start date', startDate.value, 'end date', endDate.value);
  }
  // private filterTripsByPrice(cost: number) {
  //   this.displayedTrips = this.filteredTrips.filter((trip) => 
  //     cost >= trip.cost
  //   );
  //   // if (this.displayedTrips.length === 0) {
  //   //   this.displayedTrips = this.filteredTrips;
  //   //   this.updateDisplayedTrips();
  //   // }
  //   this.updateDisplayedTrips();
  // }

  private filterPlace(trips: Trip[]) {
    trips.forEach((trip) => {
      if (this.toPlaces.includes(trip.title)) {
        return;
      } else {
        this.toPlaces.push(trip.title);
      }
    });
  }
}
