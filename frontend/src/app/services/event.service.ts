// FRONT (event.service.ts)
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:3000/api/event';
  // TODO : créer un service/hook pour récupérer le token
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  createEvent(event: any): Observable<any> {
    console.log('Token sent:', this.token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
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
    const favoriteUrl = `http://localhost:3000/api/favorise-event/${eventId}`;
    return this.http.post(favoriteUrl, {});
  }

  getEventForEdit(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/${id}/edit`, { headers });
  }

  editEvent(id: string, event: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.put<any>(`${this.apiUrl}/${id}`, event, { headers });
  }
}
