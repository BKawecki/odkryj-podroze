import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VacationService } from '../vacation.service';

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

  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  emitButtonClick() {
    this.buttonClick.emit();
  }
}
