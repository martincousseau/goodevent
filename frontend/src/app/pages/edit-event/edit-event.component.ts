import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css'],
})
export class EditEventComponent implements OnInit {
  eventId: string | null = null;
  event: any = {
    name: '',
    theme: '',
    price: null,
    event_date: '',
  };
  error: string | null = null;

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.eventId = params.get('id'); // Get event ID from URL parameter
      if (this.eventId) {
        this.loadEventDetails(this.eventId);
      }
    });
  }

  loadEventDetails(eventId: string) {
    this.eventService.getEventById(eventId).subscribe({
      next: (event) => {
        this.event = event;
      },
      error: (err) => {
        this.error = 'Error loading event details.';
      },
    });
  }

  onSubmit() {
    if (this.eventId) {
      this.eventService.editEvent(this.eventId, this.event).subscribe({
        next: (response) => {
          this.router.navigate(['/home']); // Redirect after successful edit
        },
        error: (err) => {
          this.error = 'Error updating event.';
        },
      });
    }
  }
}
