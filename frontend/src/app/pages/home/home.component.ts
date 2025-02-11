import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  events: any[] = [];
  filteredEvents: any[] = [];
  filter: string = 'all';
  sort: string = '';
  currentEventIndex: number = 0; // Index pour la pagination du carrousel
  carouselTransform: string = 'translateX(0)'; // Transformation du carrousel

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    // Charger les événements au démarrage
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
      this.filteredEvents = data; // Initialiser filteredEvents avec tous les événements
    });
  }

  applyFilters(): void {
    // Appliquer le filtre
    let filtered = this.events;

    if (this.filter !== 'all') {
      filtered = filtered.filter((event) => event.theme === this.filter);
    }

    // Appliquer le tri
    if (this.sort === 'date') {
      filtered = filtered.sort(
        (a, b) =>
          new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
      );
    } else if (this.sort === 'price') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    }

    // Mettre à jour les événements filtrés
    this.filteredEvents = filtered;

    // Réinitialiser la pagination du carrousel
    this.currentEventIndex = 0;
    this.updateCarouselTransform();
  }

  // Mise à jour de la transformation du carrousel (défilement)
  updateCarouselTransform(): void {
    const itemWidth = 100; // Largeur de chaque élément en pourcentage
    const translateX = -this.currentEventIndex * itemWidth;
    this.carouselTransform = `translateX(${translateX}%)`;
  }

  // Fonction pour passer à l'événement précédent
  prevEvent(): void {
    if (this.currentEventIndex > 0) {
      this.currentEventIndex--;
      this.updateCarouselTransform();
    }
  }

  // Fonction pour passer à l'événement suivant
  nextEvent(): void {
    if (this.currentEventIndex < this.filteredEvents.length - 1) {
      this.currentEventIndex++;
      this.updateCarouselTransform();
    }
  }
}
