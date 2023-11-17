import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Trip } from './models/trip';

@Injectable({
  providedIn: 'root'
})
export class VacationService {
  selectedTrips: Trip[] = [];

  addSelectedTrip(trip: Trip) {
    this.selectedTrips.push(trip);
  }
}
