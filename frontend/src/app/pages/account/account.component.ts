// account.component.ts

import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  user: any;
  user_events: any[] = [];
  user_fav_events: any[] = [];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.getUserData().subscribe((data) => {
      this.user = data.user;
      this.user_events = data.user_events;
      this.user_fav_events = data.user_fav_events;
    });
  }
}
