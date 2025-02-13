import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:3000/event';

  constructor(private http: HttpClient) {}
  // Mock des données d'événements
  private events = [
    {
      id: '1',
      name: 'Concert de Jazz',
      theme: 'Music',
      price: 25,
      event_date: '2025-02-25T20:00:00',
    },
    {
      id: '2',
      name: 'Match de Football',
      theme: 'Sports',
      price: 15,
      event_date: '2025-03-10T18:00:00',
    },
    {
      id: '3',
      name: 'Exposition Art Contemporain',
      theme: 'Art',
      price: 12,
      event_date: '2025-03-15T10:00:00',
    },
    {
      id: '4',
      name: 'Festival de Musique Électronique',
      theme: 'Music',
      price: 40,
      event_date: '2025-04-01T22:00:00',
    },
    {
      id: '5',
      name: 'Match de Basketball',
      theme: 'Sports',
      price: 20,
      event_date: '2025-03-20T20:00:00',
    },
    {
      id: '6',
      name: 'Match de Basketball',
      theme: 'Sports',
      price: 20,
      event_date: '2025-03-20T20:00:00',
    },
    {
      id: '7',
      name: 'Match de Basketball',
      theme: 'Sports',
      price: 20,
      event_date: '2025-03-20T20:00:00',
    },
  ];

  createEvent(event: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, event);
  }

  getEventById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getEvents(): Observable<any[]> {
    // return this.http.get<any>(this.apiUrl);
    return of(this.events);
  }
}
