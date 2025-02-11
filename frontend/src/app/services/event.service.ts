import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:3000/event';

  constructor(private http: HttpClient) {}

  createEvent(event: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, event);
  }

  getEventById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
