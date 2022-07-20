import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.scss']
})
export class SpecialEventsComponent implements OnInit {

  constructor(private eventService: EventService) { }


  ngOnInit(): void {
    this.eventService.getSpecialEvents().subscribe(res => console.log(res));

  }

}
