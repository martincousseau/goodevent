import { Component, Input, OnInit } from '@angular/core';
import { EventInterface } from 'src/app/services/event.interface';
import { EventService } from 'src/app/services/event.service';
import { AuthService } from 'src/app/services/auth.service'; // Import AuthService

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
  isLiked: boolean = false; // Initialize isLiked

  constructor(
    private eventService: EventService,
    private authService: AuthService
  ) {} // Inject AuthService

  ngOnInit(): void {
    console.log('Event ID:', this.eventId);
    if (this.eventId) {
      this.getEventDetails(this.eventId);
    }
  }

  getEventDetails(eventId: string): void {
    this.eventService.getEventById(eventId).subscribe({
      next: (event) => {
        this.event = event;
        // Check if event is already in favorites (if user is logged in)
        if (this.authService.isAuthenticated()) {
          this.checkIfLiked();
        }
      },
      error: (err) => {
        this.error = "Impossible de récupérer l'événement.";
      },
    });
  }

  checkIfLiked() {
    // Call your backend API to check if the current user has favorited this event
    // Example:
    // this.eventService.isFavorite(this.eventId).subscribe(isFavorite => {
    //   this.isLiked = isFavorite;
    // });
    // For now, just a placeholder:
    this.isLiked = Math.random() < 0.5; // Randomly sets isLiked for demonstration
  }

  toggleFavorite(): void {
    if (!this.authService.isAuthenticated()) {
      // Redirect to login or show a message if not logged in
      return;
    }
    this.isLiked = !this.isLiked;
    this.eventService.addFavorite(this.eventId!).subscribe(() => {});
  }
}
