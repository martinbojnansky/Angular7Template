import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageKey, AppRoute } from '@assets/constants';
import { LocalStorageService } from '../storage';
import { AuthService, AuthServiceState } from './auth.service';

@Injectable()
export class FakeAuthService extends AuthService {
  private authToken: string;

  constructor(private storage: LocalStorageService, private router: Router) {
    super(new AuthServiceState());
    this.init();
  }

  signIn(): void {
    this.authToken = 'xyz123456789';
    this.storage.setItem(LocalStorageKey.AUTHORIZATION_TOKEN, this.authToken);
    this.router.navigate([AppRoute.AUTH]);
    this.setState({ ...this.state, isAuth: true });
  }

  signOut(): void {
    this.storage.removeItem(LocalStorageKey.AUTHORIZATION_TOKEN);
    this.authToken = null;
    this.router.navigate([AppRoute.LOGIN]);
    this.setState({ ...this.state, isAuth: false });
  }

  private init(): void {
    this.authToken = this.storage.getItem(LocalStorageKey.AUTHORIZATION_TOKEN);
    this.setState({ ...this.state, isAuth: !!this.authToken });
  }
}

export default FakeAuthService;
