import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageKeys, AppRoutes } from '@app/shared';
import { LocalStorageService } from '../storage';
import { AuthService, AuthServiceState } from './auth.service';

@Injectable()
export class FakeAuthService extends AuthService {
  private authToken: string;

  constructor(private storage: LocalStorageService, private router: Router) {
    super(new AuthServiceState());
    this.authToken = this.storage.getItem(LocalStorageKeys.AUTHORIZATION_TOKEN);
  }

  signIn(): void {
    this.authToken = 'xyz123456789';
    this.storage.setItem(LocalStorageKeys.AUTHORIZATION_TOKEN, this.authToken);
    this.router.navigate([AppRoutes.AUTH]);
    this.setState({ ...this.state, isAuth: true });
  }

  signOut(): void {
    this.storage.removeItem(LocalStorageKeys.AUTHORIZATION_TOKEN);
    this.authToken = null;
    this.router.navigate([AppRoutes.LOGIN]);
    this.setState({ ...this.state, isAuth: false });
  }
}

export default FakeAuthService;
