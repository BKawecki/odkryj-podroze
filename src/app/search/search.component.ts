import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  fromPlaces = ['Warszawa', 'Kraków', 'Gdańsk', 'Wrocław'];
  toPlaces = ['Londyn', 'Malediwy', 'Berlin', 'Bali', 'Madryt'];
  tripOptions = ['All-inclusive', 'Last minute', 'City Break'];
}
