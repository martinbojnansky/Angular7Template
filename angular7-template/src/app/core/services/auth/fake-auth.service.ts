import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageKeys, AppRoutes } from '@app/shared';
import { StorageService } from '../storage';
import { AuthService } from './auth.service';

@Injectable()
export class FakeAuthService extends AuthService {
  private authToken: string;

  constructor(private storage: StorageService, private router: Router) {
    super();
    this.authToken = this.storage.getItem(LocalStorageKeys.AUTHORIZATION_TOKEN);
  }

  isAuth(): boolean {
    return this.authToken ? true : false;
  }

  signIn(): void {
    this.authToken = 'xyz123456789';
    this.storage.setItem(LocalStorageKeys.AUTHORIZATION_TOKEN, this.authToken);
    this.router.navigate([AppRoutes.AUTH]);
    console.log(this.storage.length);
  }

  signOut(): void {
    this.storage.removeItem(LocalStorageKeys.AUTHORIZATION_TOKEN);
    this.authToken = null;
    this.router.navigate([AppRoutes.LOGIN]);
    console.log(this.storage.length);
  }
}

export default FakeAuthService;
