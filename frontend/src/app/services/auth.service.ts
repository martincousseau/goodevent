import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // URL de l'API de backend

  constructor(private http: HttpClient) {}

  // Fonction de connexion
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // Fonction pour sauvegarder le token dans le localStorage ou sessionStorage
  saveToken(token: string): void {
    localStorage.setItem('authToken', token); // Stockage du token
  }

  // Fonction pour obtenir le token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Fonction pour vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Fonction de déconnexion
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
