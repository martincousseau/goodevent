import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  user: any;
  user_events: any[] = [];
  user_fav_events: any[] = [];

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      console.log('Utilisateur authentifié - récupération des données');
      this.accountService.getUserData().subscribe(
        (data) => {
          console.log("Réponse de l'API:", data);
          this.user = data.user;
          this.user_events = data.user_events;
          this.user_fav_events = data.user_fav_events;
        },
        (error) => {
          console.error(
            'Erreur lors de la récupération des données utilisateur:',
            error
          );
          alert('Erreur lors du chargement des données utilisateur.');
        }
      );
    } else {
      console.log(
        'Utilisateur non authentifié - redirection vers la page de login'
      );
      // Si l'utilisateur n'est pas authentifié, rediriger vers la page de login
      this.router.navigate(['/login']);
    }
  }
}
