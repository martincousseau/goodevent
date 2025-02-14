import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getUserData(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(`${this.apiUrl}/account`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getUserId(): string | null {
    const user = localStorage.getItem('user');
    if (user) {
      const userObject = JSON.parse(user);
      return userObject._id || null;
    }
    return null;
  }
}
