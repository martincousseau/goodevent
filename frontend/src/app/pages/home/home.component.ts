import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  currentEventIndex: number = 0;
  carouselTransform: string = 'translateX(0)';
  @ViewChild('carousel') carousel!: ElementRef;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    // Charger les événements au démarrage
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
      this.filteredEvents = data;
    });
    console.log('filteredEvents', this.filteredEvents);
  }

  trackById(index: number, event: { id: number }): number {
    return event.id;
  }

  scrollLeft(): void {
    this.carousel.nativeElement.scrollBy({ left: -250, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.carousel.nativeElement.scrollBy({ left: 250, behavior: 'smooth' });
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
  }
}
