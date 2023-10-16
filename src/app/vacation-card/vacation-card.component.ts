import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vacation-card',
  templateUrl: './vacation-card.component.html',
  styleUrls: ['./vacation-card.component.scss']
})
export class VacationCardComponent {
  @Input() width = '';
  @Input() img = '';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() cost = '';
}
