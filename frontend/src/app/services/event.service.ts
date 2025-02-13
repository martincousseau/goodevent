// FRONT (event.service.ts)
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:3000/api/event';

  constructor(private http: HttpClient) {}

  createEvent(event: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Token sent:', token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(this.apiUrl, event, { headers });
  }

  getEventById(id: string): Observable<any> {
    return this.http.get<any>(
      `<span class="math-inline">\{this\.apiUrl\}/</span>{id}`
    );
  }

  getEvents(): Observable<any[]> {
    console.log('getEvents');
    return this.http.get<any[]>(this.apiUrl);
  }

  addFavorite(eventId: string): Observable<any> {
    const favoriteUrl = `http://localhost:3000/api/favorise-event/${eventId}`; // URL for adding favorites
    return this.http.post(favoriteUrl, {}); // POST request, empty body
  }

  editEvent(eventId: string, event: any): Observable<any> {
    const editUrl = `http://localhost:3000/api/edit-event/${eventId}`;
    return this.http.put(editUrl, event); // PUT request for updates
  }
}
