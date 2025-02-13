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

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
      this.applyFilters(); // Apply initial filter after loading events
    });
  }

  onFilterChange(filterOptions: { theme: string; sort: string }) {
    this.filter = filterOptions.theme;
    this.sort = filterOptions.sort;
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.events]; // Create a copy to avoid modifying original array

    if (this.filter !== 'all') {
      filtered = filtered.filter((event) => event.theme === this.filter);
    }

    if (this.sort === 'date') {
      filtered.sort(
        (a, b) =>
          new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
      );
    } else if (this.sort === 'price') {
      filtered.sort((a, b) => a.price - b.price);
    }

    this.filteredEvents = filtered;
  }

  trackById(index: number, event: any): number {
    // Correct type for event
    return event._id; // Access the _id property (or event.id if that's what your data has)
  }
}
