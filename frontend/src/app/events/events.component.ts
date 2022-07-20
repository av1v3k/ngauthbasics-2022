import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

export interface Event {
  name: string,
  date: string,
  description: string
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(res => this.events = res);
  }

}
