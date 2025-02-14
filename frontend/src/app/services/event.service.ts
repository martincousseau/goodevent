// FRONT (event.service.ts)
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

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

  getEvents(): Observable<any[]> {
    console.log('getEvents');
    return this.http.get<any[]>(this.apiUrl);
  }

  getEventForEdit(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }

  editEvent(id: string, event: any): Observable<any> {
    console.log('editEvent - event.service.ts');
    console.log('Token sent:', this.token);
    console.log('event sent:', event);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.put<any>(`${this.apiUrl}/${id}`, event, { headers });
  }

  isEventFavorised(id: string): Observable<boolean> {
    const url = `${this.apiUrl}/${id}/is-favorised`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get<{ isFavorised: boolean }>(url, { headers }).pipe(
      map((response) => response.isFavorised),
      catchError(() => of(false))
    );
  }

  addFavorite(id: string): Observable<any> {
    const favoriteUrl = `${this.apiUrl}/${id}/favorite`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.post(favoriteUrl, {}, { headers });
  }
}
