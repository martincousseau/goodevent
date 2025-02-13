import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  // Fonction pour afficher/masquer le mot de passe
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // Fonction de soumission du formulaire
  onSubmit(): void {
    if (!this.email || !this.password) {
      alert('Veuillez entrer un email et un mot de passe.');
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Réponse complète reçue :', response);

        if (response.token) {
          console.log('Authentification réussie:', response);
          console.log('response.token', response.token);

          this.authService.saveToken(response.token);
          this.router.navigate(['/']);
        } else {
          console.log('Pas de token');
          alert('Authentification échouée, veuillez réessayer.');
        }
      },
      error: (error) => {
        console.error('Erreur de connexion:', error);
        alert('Erreur de connexion. Vérifiez vos identifiants.');
      },
    });
  }
}
