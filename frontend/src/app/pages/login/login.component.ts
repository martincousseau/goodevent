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
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          this.router.navigate(['/home']);
        },
        (error) => {
          alert('Erreur de connexion');
        }
      );
    }
  }
}
