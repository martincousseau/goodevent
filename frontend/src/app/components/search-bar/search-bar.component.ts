import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  theme: string = '';
  date: string = '';
  filter: string = 'all';

  search() {
    console.log({
      destination: this.theme,
      date: this.date,
    });
  }
}
