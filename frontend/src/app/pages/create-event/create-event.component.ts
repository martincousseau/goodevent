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
    // Use 'any' type or create an interface
    name: '',
    theme: '',
    price: null,
    event_date: '',
  };
  error: string | null = null;

  constructor(private eventService: EventService, private router: Router) {}

  onSubmit() {
    console.log('onSubmit createEvent:', this.event);
    this.eventService.createEvent(this.event).subscribe({
      next: (response) => {
        console.log('Event created successfully:', response);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error creating event:', err); // Log the full error object
        if (err.error && err.error.message) {
          // Check if error.error and error.error.message exist
          this.error = err.error.message; // Display backend error message
        } else {
          this.error = 'An error occurred during event creation.'; // Generic error message
        }
      },
    });
  }
}
