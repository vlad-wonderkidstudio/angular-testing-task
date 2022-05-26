import { Injectable } from '@angular/core';
import { ListItem, SaveData } from './helpers/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  countries: ListItem[] = [];
  constructor( private http: HttpClient ) { }

  getCountries(): Observable<ListItem[]> {
    return this.http.get<ListItem[]>('/assets/countries.json');
  }

  saveCountries(data: SaveData) {
    //do nothing so far
    console.log('Saved:', data);
  }
}
