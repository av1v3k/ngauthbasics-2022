import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event.service';

export interface Event {
  name: string,
  date: string,
  description: string
}
@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.scss']
})
export class SpecialEventsComponent implements OnInit {

  constructor(private eventService: EventService,
    private _router: Router) { }
  specialEvents: Event[] = [];


  ngOnInit(): void {
    this.eventService.getSpecialEvents().subscribe({
      next: (res) => this.specialEvents = res,
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(['/login']);
          }
          if (err.status === 500 && err.error === 'TOKEN_INVALID') {
            this._router.navigate(['/login']);
          }
        }
      }
    });

  }

}
