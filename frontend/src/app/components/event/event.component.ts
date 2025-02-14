import { Component, Input, OnInit } from '@angular/core';
import { EventInterface } from 'src/app/services/event.interface';
import { EventService } from 'src/app/services/event.service';
import { AuthService } from 'src/app/services/auth.service'; // Import AuthService

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent {
  @Input() eventId: string | undefined;
  @Input()
  event!: EventInterface;

  error: string | null = null;
  isLiked: boolean = false; // Initialize isLiked

  constructor(
    private eventService: EventService,
    private authService: AuthService
  ) {} // Inject AuthService

  checkIfLiked() {
    this.isLiked = Math.random() < 0.5;
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
