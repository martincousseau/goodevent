import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventInterface } from 'src/app/services/event.interface';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent {
  event: any = {
    name: '',
    theme: '',
    price: null,
    event_date: '',
  };
  error: string | null = null;

  constructor(private eventService: EventService, private router: Router) {}

  onSubmit() {
    this.eventService.createEvent(this.event).subscribe({
      next: (response) => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        if (err.error && err.error.message) {
          this.error = err.error.message;
        } else {
          this.error = 'An error occurred during event creation.';
        }
      },
    });
  }
}
