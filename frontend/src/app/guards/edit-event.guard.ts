import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EventService } from '../services/event.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root',
})
export class EditEventGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private router: Router,
    private eventService: EventService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const eventId = route.params['id'];

    return this.eventService.getEventForEdit(eventId).pipe(
      map((event) => {
        if (
          this.authService.isAuthenticated() &&
          event.creator_id === this.accountService.getUserId()
        ) {
          return true;
        } else {
          alert('Vous ne pouvez pas modifier cet événement.');
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
}
