import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css'],
})
export class EditEventComponent implements OnInit {
  eventId: string | null = null;
  event: any = {
    // Initialize image_url
    name: '',
    theme: '',
    price: null,
    event_date: '',
    image_url: '',
  };
  error: string | null = null;

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.eventId = params.get('id');
      if (this.eventId) {
        this.loadEventDetails(this.eventId);
      }
    });
  }

  loadEventDetails(eventId: string) {
    this.eventService.getEventForEdit(eventId).subscribe({
      next: (event) => {
        this.event = event;
      },
      error: (err) => {
        console.error('Error loading event:', err);
        this.error = 'Error loading event details.';
      },
    });
  }

  onSubmit() {
    if (this.eventId) {
      this.eventService.editEvent(this.eventId, this.event).subscribe({
        next: (response) => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error updating event:', err);
          alert(err.error.message);
        },
      });
    }
  }
}
