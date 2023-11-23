import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VacationService } from '../services/vacation.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-vacation-card',
  templateUrl: './vacation-card.component.html',
  styleUrls: ['./vacation-card.component.scss']
})
export class VacationCardComponent {
  @Input() width = '';
  @Input() img = '';
  @Input() title = '';
  @Input() country = '';
  @Input() cost = 0;
  @Input() startDate =  '';
  @Input() endDate = '';
  @Input() trip!: Trip;

  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  emitButtonClick() {
    this.buttonClick.emit();
  }
}
