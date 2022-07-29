import { Component, OnInit } from '@angular/core';
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

  constructor(private eventService: EventService) { }
  specialEvents: Event[] = [];


  ngOnInit(): void {
    this.eventService.getSpecialEvents().subscribe(res => this.specialEvents = res);

  }

}
