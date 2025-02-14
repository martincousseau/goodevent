import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  event: any;
  isLiked: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.eventService.getEventById(eventId).subscribe(
        (data) => (this.event = data),
        (error) =>
          console.error("Erreur lors du chargement de l'événement", error)
      );
    }
  }

  toggleFavorite(): void {
    this.isLiked = !this.isLiked;
  }

  deleteEvent(): void {
    if (confirm('Voulez-vous vraiment supprimer cet événement ?')) {
      this.eventService.deleteEvent(this.event._id).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }
}
