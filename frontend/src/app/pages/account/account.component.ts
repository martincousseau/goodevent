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
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.accountService.getUserData().subscribe({
      next: (data) => {
        this.user = data?.user ?? null;
        this.user_events = data?.user_events ?? [];
        this.user_fav_events = data?.user_fav_events ?? [];
      },
      error: (error) => {
        console.error(
          'Erreur lors de la récupération des données utilisateur:',
          error
        );
        alert('Erreur lors du chargement des données utilisateur.');
      },
    });
  }
}
