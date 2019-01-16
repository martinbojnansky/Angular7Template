import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageKeys, AppRoutes } from '@shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private authToken: string;

  constructor(private router: Router) {
    this.authToken = localStorage.getItem(LocalStorageKeys.AUTHORIZATION_TOKEN);
  }

  isAuthorized(): boolean {
    return this.authToken ? true : false;
  }

  signIn() {
    this.authToken = 'xyz123456789';
    localStorage.setItem(LocalStorageKeys.AUTHORIZATION_TOKEN, this.authToken);
    this.router.navigate([AppRoutes.ADMIN]);
  }

  signOut() {
    localStorage.removeItem(LocalStorageKeys.AUTHORIZATION_TOKEN);
    this.authToken = null;
    this.router.navigate([AppRoutes.DEFAULT]);
  }
}
