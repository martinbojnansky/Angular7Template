import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageKeys, AppRoutes } from '@app/shared';

export abstract class AuthorizationService {
  abstract isAuthorized(): boolean;
  abstract signIn(): void;
  abstract signOut(): void;
}

@Injectable()
export class FakeAuthorizationService extends AuthorizationService {
  private authToken: string;

  constructor(private storage: Storage, private router: Router) {
    super();
    this.authToken = storage.getItem(LocalStorageKeys.AUTHORIZATION_TOKEN);
  }

  isAuthorized(): boolean {
    return this.authToken ? true : false;
  }

  signIn(): void {
    this.authToken = 'xyz123456789';
    this.storage.setItem(LocalStorageKeys.AUTHORIZATION_TOKEN, this.authToken);
    this.router.navigate([AppRoutes.AUTH]);
  }

  signOut(): void {
    this.storage.removeItem(LocalStorageKeys.AUTHORIZATION_TOKEN);
    this.authToken = null;
    this.router.navigate([AppRoutes.LOGIN]);
  }
}
