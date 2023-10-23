import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import TRIPS from "src/assets/karty/wycieczki";
import { Trip } from "../models/trip";

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    getTrips(): Observable<Array<Trip>> {
        return of(TRIPS);
    }
}