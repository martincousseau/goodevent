// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    console.log('inside login');
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(userData: any): Observable<any> {
    console.log('userData:', userData);
    console.log('apiUrl', this.apiUrl);
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    console.log('inside isAuthenticated :', !!this.getToken());
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}
