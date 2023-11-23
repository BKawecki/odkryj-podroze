import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class VacationService {
  selectedTrips: Trip[] = [];

  addSelectedTrip(trip: Trip) {
    trip.isReserved = true;
    this.selectedTrips.push(trip);
  }

  cancelReservation(trip: Trip) {
    trip.isReserved = false;
    const index = this.selectedTrips.findIndex(selectedTrip => selectedTrip === trip);
    if (index !== -1) {
      this.selectedTrips.splice(index, 1);
    }
  }
}
