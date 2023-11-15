import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  @Output() outputCard = new EventEmitter<any>();

  reserveCard(card: any) {
    this.outputCard.emit(card);
  }
}
