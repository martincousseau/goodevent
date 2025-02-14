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
  themeFilter: string = 'all';
  sortFilter: string = 'all';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
      this.applyFilters();
    });
  }

  onFilterChange(filters: { theme: string; sort: string }) {
    this.themeFilter = filters.theme;
    this.sortFilter = filters.sort;
    this.applyFilters();
  }

  applyFilters() {
    let filtered = this.events;

    if (this.themeFilter !== 'all') {
      filtered = filtered.filter((event) => event.theme === this.themeFilter);
    }

    if (this.sortFilter !== 'all') {
      filtered = filtered.sort((a, b) => {
        if (this.sortFilter === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    }

    this.filteredEvents = filtered;
  }

  trackById(index: number, event: any): number {
    return event._id;
  }
}
