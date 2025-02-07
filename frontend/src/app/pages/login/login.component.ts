// login.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  passwordVisible: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  // Fonction pour afficher/masquer le mot de passe
  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  // Fonction qui sera exécutée lors de la soumission du formulaire
  onSubmit(): void {
    const loginData = {
      email: this.email,
      password: this.password,
    };

    this.http.post('/login', loginData).subscribe(
      (response) => {
        // On redirige l'utilisateur après la connexion (si succès)
        this.router.navigate(['/home']);
      },
      (error) => {
        // Gérer l'erreur de connexion (par exemple, afficher un message)
        console.error('Erreur de connexion:', error);
      }
    );
  }
}
