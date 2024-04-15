import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Trip } from '../models/trip';
import { MatPaginator } from '@angular/material/paginator';
import { VacationService } from '../services/vacation.service';
import TRIPS from 'src/assets/karty/wycieczki';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('startDate', { static: true }) startDate!: ElementRef;
  @ViewChild('endDate', { static: true }) endDate!: ElementRef;
  enteredCost!: number;
  displayedTrips: any[] = [];
  trips!: Array<Trip>;
  filteredTrips!: Array<Trip>;
  fromPlaces = ['Warszawa', 'Kraków', 'Gdańsk', 'Wrocław'];
  toPlaces: Array<string> = [];
  tripOptions = ['All-inclusive', 'Last minute', 'City Break'];
  selectedCheckboxes: Array<string> = [];
  reservedTrips!: Array<Trip>;

  constructor(private vacationService: VacationService) {
    this.trips = TRIPS
    this.reservedTrips = this.vacationService.selectedTrips;
    this.filteredTrips = [...this.trips];
    this.filterReservedTrips();
    this.displayedTrips = [...this.filteredTrips];
    this.filterPlace(this.filteredTrips);
  }

  ngOnInit(): void {
    this.updateDisplayedTrips();

    this.paginator.page.subscribe(() => {
      this.updateDisplayedTrips();
    });
  }

  ngOnDestroy(): void {
      console.log('ondestroy');
  }

  filterReservedTrips() {
    this.filteredTrips = this.trips.filter(trip => !this.reservedTrips.includes(trip));
  }

  onButtonClick(trip: Trip) {
    this.vacationService.addSelectedTrip(trip);
    const selectedFilteredTrip = this.filteredTrips.indexOf(trip);
    const selectedDisplayedTrip = this.displayedTrips.indexOf(trip);
    this.filteredTrips.splice(selectedFilteredTrip, 1);
    this.displayedTrips.splice(selectedDisplayedTrip, 1);
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

  private filterTrips() {
    this.filteredTrips = this.trips.filter((trip) => {
      const startDateValue: string = this.startDate.nativeElement.value;
      const endDateValue: string = this.endDate.nativeElement.value;
  
      const matchesCheckboxes = this.selectedCheckboxes.length === 0 || this.selectedCheckboxes.includes(trip.title);
      const matchesCost = !this.enteredCost || trip.cost <= this.enteredCost;
      const matchesDates = (!startDateValue && !endDateValue) || (trip.startDate === startDateValue && trip.endDate === endDateValue);
      const isNotReserved = !this.reservedTrips.includes(trip);
  
      return matchesCheckboxes && matchesCost && matchesDates && isNotReserved;
    });
  
    this.updateDisplayedTrips();
  }
  
  onDateChange() {
    this.filterTrips();
  }

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
