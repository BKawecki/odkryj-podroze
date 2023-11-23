import { Component, OnInit } from '@angular/core';
import { VacationService } from '../services/vacation.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent {
  selectedTrips: Trip[] = [];

  constructor(private vacationService: VacationService) {
    this.selectedTrips = vacationService.selectedTrips;
  }

  onCancelButtonClick(trip: Trip) {
    this.vacationService.cancelReservation(trip);
  }
}
