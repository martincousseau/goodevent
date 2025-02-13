import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  theme: string = 'all';
  sort: string = 'all';

  @Output() filterChange = new EventEmitter<{ theme: string; sort: string }>();

  search() {
    this.filterChange.emit({ theme: this.theme, sort: this.sort });
  }

  resetFilter() {
    this.theme = 'all';
    this.sort = '';
    this.search();
  }
}
