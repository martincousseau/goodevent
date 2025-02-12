// account.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getUserData(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/account');
  }
}
