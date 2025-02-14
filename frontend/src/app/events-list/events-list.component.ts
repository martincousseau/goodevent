import { Component, Input, OnInit } from '@angular/core';
import { EventInterface } from 'src/app/services/event.interface';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css'],
})
export class EventsListComponent implements OnInit {
  @Input() events: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  onEventDeleted(eventId: string) {
    this.events = this.events.filter((event) => event._id !== eventId);
  }
}
