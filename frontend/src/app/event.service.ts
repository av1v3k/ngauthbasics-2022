import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _events = `http://localhost:3000/api/events`;
  private _specialevents = `http://localhost:3000/api/specialevents`;

  constructor(private http: HttpClient) { }


  getEvents() {
    return this.http.get<any>(this._events);
  }

  getSpecialEvents() {
    return this.http.get<any>(this._specialevents);
  }
}
