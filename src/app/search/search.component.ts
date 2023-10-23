import { Component } from '@angular/core';
import TRIPS from 'src/assets/karty/wycieczki';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  trips = TRIPS;
  fromPlaces = ['Warszawa', 'Kraków', 'Gdańsk', 'Wrocław'];
  toPlaces = ['Londyn', 'Malediwy', 'Berlin', 'Bali', 'Madryt'];
  tripOptions = ['All-inclusive', 'Last minute', 'City Break'];
}
