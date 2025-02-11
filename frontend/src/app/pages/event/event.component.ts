import { Component, Input, OnInit } from '@angular/core';
import { EventInterface } from 'src/app/services/event.interface';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  @Input() eventId: string | undefined;

  event: EventInterface = {
    name: '',
    theme: '',
    price: null,
    event_date: '',
  };
  error: string | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    if (this.eventId) {
      this.getEventDetails(this.eventId);
    }
  }

  getEventDetails(eventId: string): void {
    this.eventService.getEventById(eventId).subscribe(
      (event) => {
        this.event = event;
      },
      (err) => {
        this.error = "Impossible de récupérer l'événement.";
      }
    );
  }
}
