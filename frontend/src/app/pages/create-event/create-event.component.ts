import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent {
  event = {
    name: '',
    theme: '',
    price: null,
    event_date: '',
  };
  error: string | null = null;

  constructor(private eventService: EventService, private router: Router) {}

  onSubmit() {
    // Appeler ton service pour envoyer l'événement au backend
    this.eventService.createEvent(this.event).subscribe(
      (response) => {
        // Si tout va bien, rediriger ou informer l'utilisateur
        this.router.navigate(['/home']);
      },
      (err) => {
        // Si une erreur survient, l'afficher
        this.error =
          "Une erreur est survenue lors de la création de l'événement.";
      }
    );
  }
}
