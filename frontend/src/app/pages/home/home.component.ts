import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  events: any[] = [];
  filter: string = 'all';
  sort: string = '';

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.filter = params['filter'] || 'all';
      this.sort = params['sort'] || '';
      this.loadEvents();
    });
  }

  loadEvents(): void {
    // this.eventService.getEvents(this.filter, this.sort).subscribe(
    //   (data) => {
    //     this.events = data;
    //   },
    //   (error) => {
    //     console.error('Erreur lors du chargement des événements', error);
    //   }
    // );
  }

  // Méthode pour appliquer les filtres et tri
  applyFilters(): void {
    this.loadEvents();
  }
}
