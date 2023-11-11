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
  @Input() country = '';
  @Input() cost = 0;
  @Input() startDate =  '';
  @Input() endDate = '';

  // get formattedStartDate(): string {
  //   return this.formatDate(this.startDate);
  // }

  // get formattedEndDate(): string {
  //   return this.formatDate(this.endDate);
  // }

  // private formatDate(date: Date): string {
  //   const day = date.getDate().toString().padStart(2, '0');
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const year = date.getFullYear();

  //   return `${month}-${day}-${year}`;
  // }
}
