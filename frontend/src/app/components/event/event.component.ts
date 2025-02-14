// event.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { EventInterface } from 'src/app/services/event.interface';
import { EventService } from 'src/app/services/event.service';
import { AuthService } from 'src/app/services/auth.service';
import { AccountService } from 'src/app/services/account.service';

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
    private accountService: AccountService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.checkIfLiked();
  }

  checkIfLiked() {
    this.accountService.getUserData().subscribe({
      next: (data) => {
        const user_fav_events = data?.user_fav_events ?? [];
        this.isLiked = user_fav_events.some(
          (favEvent: { _id: string | undefined }) =>
            favEvent._id === this.eventId
        );
      },
      error: (error) => {
        console.error(
          'Erreur lors de la récupération des données utilisateur:',
          error
        );
        alert('Erreur lors du chargement des données utilisateur.');
      },
    });
  }

  toggleFavorite(): void {
    if (!this.authService.isAuthenticated()) {
      return;
    }

    this.eventService.toggleFavorite(this.eventId!).subscribe({
      next: () => {
        this.isLiked = !this.isLiked;
      },
      error: (err) => {
        this.error = err.message;
      },
    });
  }

  deleteEvent(): void {
    if (!this.authService.isAuthenticated()) {
      return;
    }
    console.log('deleteEvent', this.eventId);
    this.eventService.deleteEvent(this.eventId!).subscribe({
      next: () => {
        alert('Événement supprimé avec succès.');
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }
}
