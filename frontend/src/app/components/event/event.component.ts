import { Component, Input, OnInit } from '@angular/core';
import { EventInterface } from 'src/app/services/event.interface';
import { EventService } from 'src/app/services/event.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  @Input() eventId: string | undefined;
  @Input() event!: EventInterface;

  error: string | null = null;
  isLiked: boolean = false;

  constructor(
    private eventService: EventService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.checkIfLiked();
  }

  checkIfLiked() {
    this.eventService.isEventFavorised(this.eventId!).subscribe({
      next: (isLiked: boolean) => {
        this.isLiked = isLiked;
      },
      error: (err: { message: string | null }) => {
        this.error = err.message;
      },
    });
  }

  toggleFavorite(): void {
    console.log('toggleFavorite');
    if (!this.authService.isAuthenticated()) {
      return;
    }

    this.isLiked = !this.isLiked;
    this.eventService.addFavorite(this.eventId!).subscribe({
      next: () => {
        this.isLiked = !this.isLiked;
      },
      error: (err) => {
        this.error = err.message;
        this.isLiked = !this.isLiked;
      },
    });
  }
}
